import gql from "graphql-tag";

// Mutation to log in a user and get a token
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token 
      user { 
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
      token 
      user {
        _id 
        username 
      }
    }
  }
`;

// Mutation to save a book to the user's savedBooks list
export const SAVE_BOOK = gql`
  mutation saveBook($book: SavedBookInput!) {
    saveBook(book: $book) {
      username 
      email 
      bookCount 
      savedBooks { 
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
      username 
      email 
      bookCount 
      savedBooks { 
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
