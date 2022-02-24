import { makeAugmentedSchema } from "neo4j-graphql-js"

import { typeDefs } from "./gql/typeDefs"
import { resolvers } from "./gql/resolvers"
import { factoryApolloServer } from "./apollo-server"


const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    mutation: false,
  },
})

const server = factoryApolloServer({ schema })

exports.handler = server.createHandler()
