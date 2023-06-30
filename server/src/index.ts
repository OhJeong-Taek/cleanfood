import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import CleanFoodAPI from './cleanfoodapi.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';
import 'dotenv/config';

interface ContextValue {
  dataSources: {
    cleanFoodAPI: CleanFoodAPI;
  };
}


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
        const { cache } = server;
       return {
         // We create new instances of our data sources with each request,
         // passing in our server's cache.
         dataSources: {
            cleanFoodAPI: new CleanFoodAPI({ cache }),
         },
       };
     },
  });
  
  console.log(`🚀  Server ready at: ${url}`);