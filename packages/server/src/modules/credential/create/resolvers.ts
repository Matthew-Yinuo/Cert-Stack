import { IResolver } from "../../../types/graphql-utils";
import { Credential } from "../../../entity/Credentials";
import { isAuthenticated } from "../../shared/isAuthenticated";
export const resolvers: IResolver = {
  Mutation: {
    createCredential: async (
      _,
      { input: { recipient, email, groupId } },
      { session }
    ) => {
      isAuthenticated(session);
      await Credential.create({
        recipient,
        email,
        groupId,
        userId: session.userId
      });
      return true;
    }
  }
};
