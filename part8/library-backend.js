const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(name: String, genre: String): [Book]
    allAuthors: [AuthorInfo]
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token 
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
    me: async () => await User.findOne({ username: "admin:user" }),
  },

  Mutation: {
    addBook: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError("Invalid token", {
          extensions: {
            code: "INVALID_TOKEN",
            invalidArgs: args,
            error,
          },
        });
      } else {
        try {
          let author;
          let bookData = args;
          const existingAuthor = await Author.findOne({ name: args.author });
          if (existingAuthor) {
            bookData = {
              ...bookData,
              author: {
                id: existingAuthor._id,
                name: existingAuthor.name,
              },
            };
          } else {
            author = await Author.create({ name: args.author });
            bookData = {
              ...bookData,
              author: {
                id: author._id,
                name: author.name,
              },
            };
          }
          const newBook = await Book.create(bookData);

          return newBook;
        } catch (error) {
          throw new GraphQLError("Invalid arguments", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }
    },
    editAuthor: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError("Invalid token", {
          extensions: {
            code: "INVALID_TOKEN",
            invalidArgs: args,
            error,
          },
        });
      } else {
        try {
          const author = await Author.findOneAndUpdate(
            { name: args.name },
            { born: args.born },
            { new: true }
          );

          return author;
        } catch (error) {
          throw new GraphQLError("Name or born values not valid", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error,
            },
          });
        }
      }
    },
    createUser: async (root, args) => {
      // it should save the password hash here with bcrypt
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      // actually it should check the passwordHash
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET);

      return { value: token };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    // context of each request, logic kind of works as a middleware for currentUser -> userCheckMiddleware
    // token is ALWAYS created / return on login from a valid user
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
