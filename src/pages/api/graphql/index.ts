import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import resolvers from './resolvers/main'
import typeDefs from './schema/main'
import { startServerAndCreateNextHandler } from '../../../startServerAndCreateNextHandler'
import { NextApiHandler } from 'next'
import NextCors from 'nextjs-cors'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})

const handler = startServerAndCreateNextHandler(server)

const graphql: NextApiHandler = async (req, res) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  })

  await handler(req, res)
}

export default graphql
