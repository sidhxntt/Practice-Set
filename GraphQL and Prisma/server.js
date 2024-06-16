import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './GraphQL/ApolloSchema.js';
import resolvers from './GraphQL/ApolloResolvers.js'; 
import connectToDatabase from './connect_to_db.js'; 

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const Databse_function = async () => {
  try {
    await connectToDatabase();
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error.message);
  }
};

Databse_function();
