import { driver } from "./neo4j-proxy"
import { verifyJwt } from "./jwt-proxy"


const context = async ({ event }) => {
  const token = event.headers?.authorization?.slice(7)
  let userId

  if (!token) return { driver }

  const authResult = new Promise((resolve, reject) => {
    const options = { algorithms: ["RS256"] }
    const callback = (error, decoded) => {
      if (error) reject({ error })
      if (decoded) resolve(decoded)
    }
    verifyJwt(token, options, callback)
  })

  const decoded = await authResult

  const req = event
  const userid = decoded.sub

  return {
    driver,
    req,
    cypherParams: { userId },
  }
}

export const defaults = {
  context,
  introspection: true,
  playground: true
}

export const factoryOptions = partial => Object.assign({}, defaults, partial)

export const factoryApolloServer = partialOptions => {
  const options = factoryOptions(partialOptions)
  return new ApolloServer(options)
}
