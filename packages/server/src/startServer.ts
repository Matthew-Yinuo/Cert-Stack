import { ApolloServer } from "apollo-server-express";

import { genSchema } from "./utils/genSchema";
import { createConnection } from "./utils/createConnection";
import { createApplication } from "./utils/createApplication";

export const startServer = async () => {
  await createConnection();
  const app = createApplication();

  const schema = genSchema() as any;

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      session: req ? req.session : undefined
    })
  });

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

  return app;
};
