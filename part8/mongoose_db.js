const mongoose = require("mongoose");
const { authors, books } = require("./seed");
const Author = require("./models/author");
const Book = require("./models/book");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => {
    // debug
    console.log("Clearing db...");
    return Promise.all([Author.deleteMany(), Book.deleteMany()]);
  })
  .then(() => {
    // debug
    console.log("DB cleared!");
  })
  .then(() => {
    console.log("connected to MongoDB \n Initializing authors...");
    const authorPromises = authors.map((author) => new Author(author).save());
    return Promise.all(authorPromises);
  })
  .then(async () => {
    console.log("Authors initialized! \n Initializing books...");

    const authors = await Author.find({});

    const bookPromises = books.map((book) => {
      const authorId = authors.find(
        (author) => author.name === book.author
      )._id;
      const updatedBook = { ...book, author: authorId };
      return new Book(updatedBook).save();
    });
    return Promise.all(bookPromises);
  })
  .then(() => {
    console.log("Books initialized! \n DB ready to use");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
