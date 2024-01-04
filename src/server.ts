import { ApolloServer } from '@apollo/server';
import gql from "graphql-tag";
import {startStandaloneServer} from "@apollo/server/standalone";
import fs from 'node:fs'
import path from 'node:path'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const links = [
  {
    id: "link-0",
    description: "Graphql",
    url: 'https://sample.com'
  }
]

// リゾルバ. 定義したものに対して実態を入れるような役目
const resolvers  = {
  Query: {
    info: ()=> 'Hello',
    feed: async (parent, args, context) => {
      return await context.prisma.link.findMany()
    }
  },
  Mutation: {
    post:async (parent, args, context) => {

      const newLink = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      })

      let idCount = links.length

      return newLink
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./src/schema.graphql", "utf-8"),
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    ...req,
    prisma,
  }),
});

console.log(`🚀  Server ready at: ${url}`);