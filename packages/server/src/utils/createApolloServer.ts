import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import { genSchema } from "./genSchema";
import { redis } from "../redis";

const createApolloServer = (app: express.Application): ApolloServer => {
  const schema = genSchema() as any;

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      session: req ? req.session : undefined,
      serverURL: req ? req.protocol + "://" + req.get("host") : "",
      redis
    })
  });

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_HOST
    }
  });

  return server;
};

export { createApolloServer };
