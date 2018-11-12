import * as React from "react";
import App, { Container } from "next/app";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { NormalizedCache } from "apollo-cache-inmemory";

import withApollo from "../src/lib/withApollo";

class NextApp extends App<{
  apolloClient: ApolloClient<NormalizedCache>;
}> {
  static async getInitialProps(context: any) {
    const { Component } = context;

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context);
    }

    return {
      pageProps
    };
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(NextApp);
