import gql from "graphql-tag";
import { MyNextContext } from "../types/next";
import redirect from "./redirect";

export const isAuthenticated = (ctx: MyNextContext) =>
  ctx.apolloClient
    .query({
      query: gql`
        query MeQuery {
          me {
            _id
            email
          }
        }
      `
    })
    .then(({ data }: { data: any }) => {
      if (!data.me) {
        redirect(ctx, "/login");
      }
    })
    .catch(e => {
      // Fail gracefully
      console.log([
        {
          path: "isAuthenticated",
          message: `something wrong${e}`
        }
      ]);
      return {};
    });
