import { IResolver } from "../../../types/graphql-utils";
import { Credential } from "../../../entity/Credential";
import { isAuthenticated } from "../../shared/isAuthenticated";

export const resolvers: IResolver = {
  Query: {
    findCredentials: async (_, { groupId }, { session }) => {
      isAuthenticated(session);
      const credentials = await Credential.find({ groupId });
      return credentials;
    }
  }
};
