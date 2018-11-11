import { IResolver } from "../../../types/graphql-utils";
export const resolvers: IResolver = {
  Mutation: {
    logout: async (_, __, { session, res }) => {
      const { userId } = session;
      if (userId) {
        session.destroy(err => {
          if (err) {
            console.log(err);
          }
        });
        res.clearCookie("qid");
        return true;
      }
      return false;
    }
  }
};
