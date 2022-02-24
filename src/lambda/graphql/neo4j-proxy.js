import * as neo4j from "neo4j-driver"


const authToken = neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)

export const driver = neo4j.driver(
  process.env.NEO4J_URI,
  authToken
)
