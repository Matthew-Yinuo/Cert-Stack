import { NextContext } from "next";
import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

export interface MyNextContext extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export interface IGetInitialProps {
  ctx: MyNextContext;
}
