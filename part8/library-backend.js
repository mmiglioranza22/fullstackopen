const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { v1: uuid } = require("uuid");
const Book = require("./models/book");
const Author = require("./models/author");

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
    bookCount: async () => await Book.find({}).countDocuments(),
    authorCount: async () => await Author.find({}).estimatedDocumentCount(),
    allBooks: async (root, args) => {
      // filters are not cummulative
      // const filters = Object.entries(args);

      if (args.name) {
        return await Book.find({ "author.name": args.name }).populate("author");
      } else if (args.genre) {
        return await Book.find({ genres: args.genre }).populate("author");
      } else {
        return await Book.find({}).populate("author");
      }
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({});

      const books = await Book.find({}).populate("author");

      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author.name === author.name
        ).length;
        return {
          name: author.name,
          bookCount: bookCount,
          born: author.born,
        };
      });
    },
  },

  // Mutation: {
  //   addBook: async (root, args) => {
  //     const existingAuthor = books.findIndex(
  //       (books) => books.author === args.author
  //     );
  //     if (existingAuthor === -1) {
  //       authors = authors.concat({ name: args.author, id: uuid() });
  //     }
  //     const newBook = { ...args, id: uuid() };
  //     books = books.concat(newBook);
  //     return newBook;
  //   },
  //   editAuthor: async (root, args) => {
  //     const updatedAuthor = authors.findIndex(
  //       (author) => author.name === args.name
  //     );
  //     if (updatedAuthor === -1) return null;
  //     authors[updatedAuthor] = { ...authors[updatedAuthor], born: args.born };
  //     return authors[updatedAuthor];
  //   },
  // },
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
