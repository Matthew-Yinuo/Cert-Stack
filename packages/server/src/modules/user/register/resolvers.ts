import { IResolver } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { duplicateEmail } from "./errorMessages";
import { GQL } from "../../../types/schema";
import { sendEmail } from "../../../utils/sendEmail";
import { createConfirmEmailLink } from "./ConfirmEmailLink";

export const resolvers: IResolver = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, serverURL }
    ) => {
      const { email, password } = args;

      const userAlreadyExists = await User.findOne({ email });

      if (userAlreadyExists) {
        return [{ path: "email", message: duplicateEmail }];
      }

      const user = await User.create({ email, password });
      const url = await createConfirmEmailLink({
        serverURL,
        userId: user._id,
        redis
      });
      await sendEmail({
        recipient: email,
        subject: "Accredible - Verify your email address",
        html: `<html>
        <body>
          <a href="${url}">Verify my account</a>
        </body>
        </html>`
      });
      return null;
    }
  }
};
