import { IResolver } from "../../../types/graphql-utils";
import { Credential } from "../../../entity/Credential";
import { Group, IGroupModel } from "../../../entity/Group";
import { isAuthenticated } from "../../shared/isAuthenticated";
import { notExist } from "./errorMessages";
import { sendEmail } from "../../../utils/sendEmail";
import { GQL } from "../../../types/schema";

export const resolvers: IResolver = {
  Mutation: {
    publishCredential: async (
      _,
      {
        input: { credentialId }
      }: {
        input: GQL.IPublishCredentialInput;
      },
      { session }
    ) => {
      isAuthenticated(session);

      const credential = await Credential.findOne({ _id: credentialId });

      if (!credential) {
        return [
          {
            path: "credential",
            message: notExist
          }
        ];
      }

      const group = (await Group.findOne({
        _id: credential.groupId
      })) as IGroupModel;

      await sendEmail({
        recipient: credential.recipientEmail,
        subject: `Accredible - ${group.course} Certificate for ${
          group.organization
        }`,
        html: `<html>
        <body>
          <h1>Here is your ${group.course} Credential.</h1>
          <a href="${
            process.env.FRONTEND_HOST
          }/credential/${credentialId}}">Verify my credential</a>
        </body>
        </html>`
      });

      await Credential.update(
        { _id: credentialId },
        {
          issueDate: new Date()
        }
      );

      return true;
    }
  }
};
