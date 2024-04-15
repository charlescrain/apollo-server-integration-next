import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import resolvers from './graphql/resolvers/main'
import typeDefs from './graphql/schema/main'
import { startServerAndCreateNextHandler } from '../../startServerAndCreateNextHandler'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})

export default startServerAndCreateNextHandler(server)
