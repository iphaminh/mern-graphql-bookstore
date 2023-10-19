// Import gql from apollo-server-express for defining GraphQL schemas
const { gql } = require('apollo-server-express');

// Define the GraphQL schema
const typeDefs = gql `
// Define the Book type with its fields
type Book {
    _id: ID               
    authors: [String]     
    description: String   
    bookId: String        // Book's unique identifier
    image: String         
    link: String          
    title: String        
}

// Define the input type for saving a book
input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

// Define the User type with its fields
type User {
    _id: ID               // Unique ID for the user
    username: String      
    email: String         
    password: String      
    savedBooks: [Book]    // List of books saved by the user
}

// Define the Auth type for authentication responses
type Auth {
    token: ID!            // Authentication token
    user: User            // User data
}

// Define available queries
type Query {
    me: User              // Fetch the current user's data
}

// Define available mutations (actions)
type Mutation {
    login(email: String!, password: String!): Auth                           // Authenticate and log in a user
    addUser(username:String!, email: String!, password:String!): Auth        // Register a new user
    saveBook(input: BookInput! ): User                                       // Save a book to the user's list
    removeBook(bookId: ID!): User                                            // Remove a book from the user's list
}
`;

// Export the type definitions for use in other parts of the application
module.exports = typeDefs;
