import { ApolloServer } from '@apollo/server'
import resolvers from './graphql/resolvers/main'
import typeDefs from './graphql/schema/main'
import { startServerAndCreateNextHandler } from '../../startServerAndCreateNextHandler'

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

export default startServerAndCreateNextHandler(server)
