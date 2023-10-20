const { gql } = require('apollo-server-express');

const typeDefs = gql`
# Define the Book type with its fields
type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String        # Book's unique identifier
    image: String
    link: String
    title: String
}

# Define the input type for saving a book
input BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

# Define the User type with its fields
type User {
    _id: ID               # Unique ID for the user
    username: String
    email: String
    password: String
    savedBooks: [Book]    # List of books saved by the user
}

# Define the Auth type for authentication responses
type Auth {
    token: ID!            # Authentication token
    user: User            # User data
}

# Define available queries
type Query {
    me: User              # Fetch the current user's data
}

# Define available mutations (actions)
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username:String!, email: String!, password:String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;
