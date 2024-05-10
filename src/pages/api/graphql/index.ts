import { ApolloServer } from '@apollo/server'
import resolvers from './resolvers/main'
import typeDefs from './schema/main'
import { startServerAndCreateNextHandler } from '../../../startServerAndCreateNextHandler'
import { NextApiHandler } from 'next'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(server)

const graphql: NextApiHandler = async (req, res) => {
  await handler(req, res)
}

export default graphql
