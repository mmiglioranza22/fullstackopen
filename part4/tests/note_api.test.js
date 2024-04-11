const { describe, it, after, beforeEach } = require("node:test");
const assert = require("node:assert");
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
      .expect((res) => {
        assert.strictEqual(res.body.length, initialBlogs.length);
      })
      .expect("Content-Type", /application\/json/);
  });
  it("_id prop exists in each blog from DB", async () => {
    await api.get("/api/blogs").expect((res) => {
      res.body.forEach((doc) => {
        assert.ok(doc._id);
      });
    });
  });

  it("creates a new post correctly in DB", async () => {
    const newBlog = {
      title: "new",
      author: "blog",
      url: "123",
      likes: 1,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect((res) => {
        assert.ok(res.body._id);
        assert.strictEqual(res.body.title, newBlog.title);
        assert.strictEqual(res.body.author, newBlog.author);
      });
    await api.get("/api/blogs").expect((res) => {
      assert.strictEqual(res.body.length, 4);
    });
  });

  it("likes default set to 0 when not passed in body payload", async () => {
    const newBlog = {
      title: "no",
      author: "likes",
      url: "no likes",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect((res) => {
        assert.ok(res.body._id);
        assert.strictEqual(res.body.title, newBlog.title);
        assert.strictEqual(res.body.author, newBlog.author);
        assert.strictEqual(res.body.likes, 0);
      });
  });
  it("return error if title or author are not sent in payload", async () => {
    const newBlog = {
      url: "no author nor title",
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
    const noTitle = {
      author: "no title",
    };
    await api
      .post("/api/blogs")
      .send(noTitle)
      .expect(400)
      .expect((res) => {
        assert.strictEqual(
          true,
          res.body.message.includes("Path `title` is required")
        );
      });

    const noAuthor = {
      title: "no author",
    };
    await api
      .post("/api/blogs")
      .send(noAuthor)
      .expect(400)
      .expect((res) => {
        assert.strictEqual(
          true,
          res.body.message.includes("Path `author` is required")
        );
      });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
