import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";

import { IOptions } from "../types/apollo";

const createApolloClient = (
  initialState: any,
  { getToken }: IOptions
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        Cookie: token ? token : null
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
};
export { createApolloClient };
