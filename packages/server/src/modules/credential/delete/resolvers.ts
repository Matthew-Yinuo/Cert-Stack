import { IResolver } from "../../../types/graphql-utils";
import { isAuthenticated } from "../../shared/isAuthenticated";
import { Credential } from "../../../entity/Credential";
import { notFoundError, permissionError } from "./errorMessages";
import { Group, IGroupModel } from "../../../entity/Group";

export const resolvers: IResolver = {
  Mutation: {
    deleteCredential: async (_, { _id }, { session }) => {
      isAuthenticated(session);

      const credential = await Credential.findOne({ _id });

      if (!credential) {
        return [
          {
            path: "credential",
            message: notFoundError
          }
        ];
      }

      const group = await Group.findOne({ _id: credential.groupId });

      if (session.userId !== (group as IGroupModel).userId) {
        // log message
        console.log(
          `this user ${
            session.userId
          } is trying to delete a listing they don't own`
        );
        return [
          {
            path: "credential",
            message: permissionError
          }
        ];
      }

      await Credential.deleteOne(credential);

      return null;
    }
  }
};
