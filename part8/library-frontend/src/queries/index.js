import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;
// const ALL_BOOKS_BY_AUTHOR = gql`
//   query findBooksByAuthor($nameToSearch: String!) {
//     allBooks(name: $nameToSearch) {
//       title
//       published
//       author
//       id
//       genres
//     }
//   }
// `;
// const ALL_BOOKS_BY_GENRE = gql`
//   query findBooksByGenre($genreToSearch: String!) {
//     allBooks(genre: $genreToSearch) {
//       title
//       published
//       author
//       id
//       genres
//     }
//   }
// `;