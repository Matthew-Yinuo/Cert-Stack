import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import * as session from "express-session";

import { genSchema } from "./utils/genSchema";
import { createConnection } from "./utils/createConnection";

export const startServer = async () => {
  await createConnection();

  const schema = genSchema() as any;

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({
      req,
      session: req ? req.session : undefined
    })
  });

  const app = express();

  app.use(
    session({
      secret: "asdjlfkaasdfkjlads",
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

  return app;
};
