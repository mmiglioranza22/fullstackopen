const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    name: String,
  },
  genres: [{ type: String }],
});

schema.plugin(uniqueValidator);

const Book = mongoose.model("Book", schema);

module.exports = Book;
