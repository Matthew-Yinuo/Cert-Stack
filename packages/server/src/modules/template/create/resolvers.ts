import { IResolver } from "../../../types/graphql-utils";
import { Template } from "../../../entity/Template";
import { isAuthenticated } from "../../user/shared/isAuthenticated";
export const resolvers: IResolver = {
  Mutation: {
    createTemplate: async (
      _,
      { input: { course, organization } },
      { session }
    ) => {
      isAuthenticated(session);
      await Template.create({
        course,
        organization,
        userId: session.userId
      });
      return true;
    }
  }
};
