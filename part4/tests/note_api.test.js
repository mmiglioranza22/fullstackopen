const { describe, it, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "TEST 1",
    author: "Martins",
    url: "123",
    likes: 1,
  },
  {
    title: "TEST 2",
    author: "Martins",
    url: "456",
    likes: 2,
  },
  {
    title: "TEST 3",
    author: "Bob",
    url: "333",
    likes: 3,
  },
];

describe("api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Promise.all(initialBlogs.map((blog) => new Blog(blog).save()));
  });
  it("fetches blogs correctly", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  after(async () => {
    await mongoose.connection.close();
  });
});
