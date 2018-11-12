import { IResolver } from "../../../types/graphql-utils";
import { Group } from "../../../entity/Groups";
import { isAuthenticated } from "../../user/shared/isAuthenticated";
import { GQL } from "../../../types/schema";
export const resolvers: IResolver = {
  Mutation: {
    createGroup: async (
      _,
      {
        input: { course, organization }
      }: {
        input: GQL.ICreateGroupInput;
      },
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
