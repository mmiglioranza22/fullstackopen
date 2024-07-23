const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const { authors, books } = require("./seed");

require("./mongoose_db");

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id : ID!
    born: Int
  }

  type AuthorInfo {
    name: String!
    bookCount: Int
    born: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(name: String, genre: String): [Book]
    allAuthors: [AuthorInfo]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
   editAuthor(
      name: String!
      born: Int!
    ): Author 
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      // filters are not cummulative
      // const filters = Object.entries(args);

      if (args.name) {
        return books.filter((books) => books.author === args.name);
      } else if (args.genre) {
        return books.filter((books) => books.genres.includes(args.genre));
      } else {
        return books;
      }
    },
    allAuthors: (root, args) => {
      return authors.map((author) => {
        return {
          name: author.name,
          bookCount: books.filter((book) => book.author === author.name).length,
          born: author.born,
        };
      });
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const existingAuthor = books.findIndex(
        (books) => books.author === args.author
      );
      if (existingAuthor === -1) {
        authors = authors.concat({ name: args.author, id: uuid() });
      }
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      const updatedAuthor = authors.findIndex(
        (author) => author.name === args.name
      );
      if (updatedAuthor === -1) return null;
      authors[updatedAuthor] = { ...authors[updatedAuthor], born: args.born };
      return authors[updatedAuthor];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
