import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";

import { createApolloClient } from "./createApolloClient";
import { IOptions } from "../types/apollo";

let apolloClient: null | ApolloClient<NormalizedCacheObject> = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

export default (initialState: any, options: IOptions) => {
  if (!process.browser) {
    return createApolloClient(initialState, options);
  }
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, options);
  }
  return apolloClient;
};
