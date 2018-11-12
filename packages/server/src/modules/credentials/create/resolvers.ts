import { IResolver } from "../../../types/graphql-utils";
import { Credential } from "../../../entity/Credentials";
import { isAuthenticated } from "../../user/shared/isAuthenticated";
import { GQL } from "../../../types/schema";
export const resolvers: IResolver = {
  Mutation: {
    createCredential: async (
      _,
      {
        input: { recipient, recipientEmail, groupId }
      }: {
        input: GQL.ICreateCredentialInput;
      },
      { session }
    ) => {
      isAuthenticated(session);
      await Credential.create({ recipient, recipientEmail, groupId });
      return true;
    }
  }
};
