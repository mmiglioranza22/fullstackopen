const mongoose = require("mongoose");
const { authors, books } = require("./seed");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    // debug
    console.log("Clearing db...");
    return Promise.all([
      Author.deleteMany(),
      Book.deleteMany(),
      User.deleteMany(),
    ]);
  })
  .then(() => {
    // debug
    console.log("DB cleared!");
  })
  .then(() => {
    console.log("connected to MongoDB\nInitializing authors...");
    const authorPromises = authors.map((author) => new Author(author).save());
    return Promise.all(authorPromises);
  })
  .then(async () => {
    console.log("Authors initialized!\nInitializing books...");

    const authors = await Author.find({});

    const bookPromises = books.map((book) => {
      const author = authors.find((author) => author.name === book.author);
      const updatedBook = {
        ...book,
        author: { id: author._id, name: author.name },
      };
      return new Book(updatedBook).save();
    });
    return Promise.all(bookPromises);
  })
  .then(() => {
    console.log("Books initialized!\nAdding user");
    return Promise.all([
      new User({ username: "admin:user", favoriteGenre: "boca" }).save(),
    ]);
  })
  .then(() => {
    // debug
    console.log("Done.\nDB ready to use");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
