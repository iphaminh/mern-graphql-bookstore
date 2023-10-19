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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs, // GraphQL schema to use
  resolvers, // Resolver functions to handle GraphQL queries
  context: ({ req }) => { // Context for GraphQL resolvers
    return {
      user: req.user, // Pass user info from the request object to the resolvers
    };
  },
});

// Apply Apollo middleware to Express.js server
server.applyMiddleware({ app });

// In a production environment, serve static assets from the build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Connect to the database and start the server
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`));
});
