// Import necessary modules
const express = require('express'); // Express.js for server creation
const path = require('path'); // Node.js path module for handling and transforming file paths
const db = require('./config/connection'); // Database connection configuration
const { ApolloServer } = require('apollo-server-express'); // ApolloServer, GraphQL server for Express.js
const { typeDefs, resolvers } = require('./schemas'); // GraphQL schema - typeDefs and resolvers

// Initialize Express.js server
const app = express();
// Use environment defined port or 3001 if not defined
const PORT = process.env.PORT || 3001;

// Express.js middleware for parsing request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create an instance of ApolloServer
const startServer = async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: authMiddleware
    });
  
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

    return server; // Return the server instance if you need it outside
};

const server = await startServer();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`));
});