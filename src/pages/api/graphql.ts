import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-micro'
import { GraphQLError } from 'graphql'
import { pick } from 'lodash'
import Cors from 'micro-cors'
import { PageConfig } from 'next'
import { buildSchema } from 'type-graphql'

import { ArtistResolver } from '~/server/schema/artist/artist-resolver'

const schema = await buildSchema({
  resolvers: [ArtistResolver],
})

const server = new ApolloServer({
  schema,
  introspection: true,
  formatError: (error: GraphQLError) => {
    return {
      ...pick(error, ['message', 'locations', 'path']),
      ...pick(error.originalError, ['code', 'state']),
    }
  },
})

const startServer = server.start()

const cors = Cors({
  origin: 'https://studio.apollographql.com',
  allowCredentials: true,
})

export default cors(async (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await server.createHandler({ path: '/api/graphql' })(req, res)
})

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
