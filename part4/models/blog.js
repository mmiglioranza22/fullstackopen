const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
