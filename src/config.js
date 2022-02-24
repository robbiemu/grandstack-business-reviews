export const config = {
  functions: {
    graphql: {
      uri: process.env.REACT_APP_GRAPHQL_URI
    }
  },
  auth0: {
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENTID
  }
}

console.log('env', process.env)
