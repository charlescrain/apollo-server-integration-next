import { ApolloServer } from '@apollo/server';
import resolvers from 'src/pages/api/graphql/resolvers/main'
import typeDefs from 'src/pages/api/graphql/schema/main'
import { startServerAndCreateNextHandler } from 'src/startServerAndCreateNextHandler';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);