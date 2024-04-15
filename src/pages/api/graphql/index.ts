import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import resolvers from './resolvers/main'
import typeDefs from './schema/main'
import { startServerAndCreateNextHandler } from '../../../startServerAndCreateNextHandler'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})

export default startServerAndCreateNextHandler(server)
