// Import necessary packages
const express = require('express');
const path = require('path');
const db = require('./config/connection');

// Import ApolloServer for GraphQL and authentication middleware
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

// Import GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;

// Initialize Apollo Server with type definitions, resolvers, and context for authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve the React app's index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Function to start Apollo Server and Express
const startApolloServer = async () => {
  // Ensure Apollo Server is fully initialized before applying middleware
  await server.start();
  server.applyMiddleware({ app });
  
  // Wait for MongoDB connection to open before starting Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the function to start the server
startApolloServer();
