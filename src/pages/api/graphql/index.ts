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

  const allowedOrigins = [
    'https://a6ef-2600-1700-eb1-de40-e136-8946-582f-e7.ngrok-free.app',
    'https://api.rare.xyz',
  ]
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }

  await handler(req, res)
}

export default graphql
