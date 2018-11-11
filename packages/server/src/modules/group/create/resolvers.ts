import { IResolver } from "../../../types/graphql-utils";
import { Group } from "../../../entity/Groups";
import { isAuthenticated } from "../../user/shared/isAuthenticated";
export const resolvers: IResolver = {
  Mutation: {
    createGroup: async (
      _,
      { input: { course, organization } },
      { session }
    ) => {
      isAuthenticated(session);
      await Group.create({
        course,
        organization,
        userId: session.userId
      });
      return true;
    }
  }
};
