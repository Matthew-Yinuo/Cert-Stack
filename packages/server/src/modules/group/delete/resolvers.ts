import { IResolver } from "../../../types/graphql-utils";
import { isAuthenticated } from "../../shared/isAuthenticated";
import { Group } from "../../../entity/Group";
import { Credential } from "../../../entity/Credential";
import {
  credentialExistsError,
  notFoundError,
  permissionError
} from "./errorMessages";

export const resolvers: IResolver = {
  Mutation: {
    deleteGroup: async (_, { _id }, { session }) => {
      isAuthenticated(session);

      const group = await Group.findOne({ _id });

      const credentials = await Credential.find({ groupId: _id });

      if (credentials.length !== 0) {
        return [
          {
            path: "group",
            message: credentialExistsError
          }
        ];
      }

      if (!group) {
        return [
          {
            path: "group",
            message: notFoundError
          }
        ];
      }

      if (session.userId !== group.userId) {
        // log message
        console.log(
          `this user ${
            session.userId
          } is trying to delete a listing they don't own`
        );
        return [
          {
            path: "group",
            message: permissionError
          }
        ];
      }

      await Group.deleteOne(group);

      return null;
    }
  }
};
