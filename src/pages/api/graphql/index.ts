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
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }

  await handler(req, res)
}

export default graphql
