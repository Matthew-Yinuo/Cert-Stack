import { createConnection } from "./utils/createConnection";
import { createApplication } from "./utils/createApplication";
import { createApolloServer } from "./utils/createApolloServer";

export const startServer = async (): Promise<void> => {
  await createConnection();

  const app = createApplication();
  const server = createApolloServer(app);

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};
