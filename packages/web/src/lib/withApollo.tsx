import * as React from "react";
import { NextComponentClass } from "next";
import Head from "next/head";
import { getDataFromTree } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

import startApollo from "./startApollo";
import { getCookie } from "./getCookie";

// TODO: fix this
export default (NextApp: NextComponentClass<any>) => {
  return class extends React.Component {
    apolloClient: ApolloClient<NormalizedCacheObject>;

    static displayName = `WithData(${NextApp.displayName})`;

    // TODO: fix this
    static async getInitialProps(context: any) {
      const {
        Component,
        router,
        ctx: { res, req }
      } = context;

      const apollo = startApollo({}, { getToken: () => getCookie(req) });

      context.ctx.apolloClient = apollo;

      let appProps = {};
      if (NextApp.getInitialProps) {
        appProps = await NextApp.getInitialProps(context);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      if (!(process as any).browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          const _App = (
            <NextApp
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
          // Run all GraphQL queries
          await getDataFromTree(_App);
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    // TODO: fix this
    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = startApollo(props.apolloState, {
        getToken: () => getCookie()
      });
    }

    render() {
      return <NextApp {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
