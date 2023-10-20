import gql from "graphql-tag";

// Mutation to log in a user and get a token
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token // JWT token for authentication when login
      user { //for client display
        _id 
        username 
      }
    }
  }
`;

// Mutation to add (register) a new user and get a token
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token // JWT token for authentication
      user {
        _id // Unique ID of the new user
        username // Username of the new user
      }
    }
  }
`;

// Mutation to save a book to the user's savedBooks list
export const SAVE_BOOK = gql`
  mutation saveBook($book: SavedBookInput!) {
    saveBook(book: $book) {
      username // Username of the user who saved the book
      email // Email of the user who saved the book
      bookCount // Total number of books saved by the user
      savedBooks { // List of books saved by the user
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

// Mutation to remove a book from the user's savedBooks list
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username // Username of the user who removed the book
      email // Email of the user who removed the book
      bookCount // Updated total number of books saved by the user
      savedBooks { // Updated list of books saved by the user
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
