import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: { [x: string]: string }) =>
      `Hello ${name || "World"}`
  }
};

export const startServer = async () => {
  const server = new GraphQLServer({ typeDefs, resolvers });

  const port = process.env.PORT || 4000;

  const app = await server.start({
    port
  });

  console.log("Server is running on localhost:4000");

  return app;
};
