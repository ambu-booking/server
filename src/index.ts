import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

const prisma = new PrismaClient();

const typeDefs = `
  type Company {
    id: String!
    name: String
  }

  type Query {
    allCompanies: [Company!]!
  }
  type Mutation {
    createCompany:[Company!]
  }
`;

const resolvers = {
  Query: {
    allCompanies: () => {
      return prisma.company.findMany();
    },
  },
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: process.env.PORT });
