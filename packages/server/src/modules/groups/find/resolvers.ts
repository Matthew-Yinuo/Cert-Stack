import { IResolver } from "../../../types/graphql-utils";
import { Group } from "../../../entity/Groups";
export const resolvers: IResolver = {
  Query: {
    findGroups: async (_, __, { session }) => {
      const groups = await Group.find({ userId: session.userId });
      return groups;
    }
  }
};
