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

// https://stackoverflow.com/questions/69710220/serverless-handler-for-apollo-server-throws-error-that-it-cant-identify-events-o
// exports.handler = server.createHandler()
const serverHandler = server.createHandler({
  cors: {
    origin: '*'
  }
});

exports.handler = (event, context, callback) => {
  return serverHandler(
    {
      ...event,
      requestContext: event.requestContext || {},
    },
    context,
    callback
  );
}