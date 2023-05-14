import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
import { CompanyResolver } from "./graphql/resolvers/CompanyResolver";

async function startServer() {
  const schema = buildSchemaSync({
    resolvers: [CompanyResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(process.env.PORT);
  console.log(`🚀  Server ready at ${url}`);
}

startServer();
