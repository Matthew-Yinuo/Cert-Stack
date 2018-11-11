import { ISession } from "../../types/graphql-utils";
export const isAuthenticated = (session: ISession) => {
  if (!session.userId) {
    throw new Error("not authenticated");
  }
};
