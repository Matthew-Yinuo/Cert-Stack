import { IResolver } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: IResolver = {
  Query: {
    me: (_, __, { session }) => User.findOne({ _id: session.userId })
  }
};
