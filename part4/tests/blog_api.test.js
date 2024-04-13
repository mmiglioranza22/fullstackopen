const { describe, it, after, beforeEach, before } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { generateHash } = require("../utils/user_hash");

const api = supertest(app);

let token;
let userId;
const testUser = { username: "test", password: "test", name: "test" };
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

describe("API tests suite - BLOGS:", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Promise.all(initialBlogs.map((blog) => new Blog(blog).save()));
  });
  describe("1- fetching posts", () => {
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
  });

  describe("2- creating posts", () => {
    before(async () => {
      const passwordHash = await generateHash(testUser.password);
      await User.create({ ...testUser, passwordHash });
      await api
        .post("/api/login")
        .send(testUser)
        .expect(200)
        .expect((res) => {
          token = res.body.token;
          userId = res.body.id;
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
        .auth(token, { type: "bearer" })
        .send(newBlog)
        .expect((res) => {
          assert.ok(res.body._id);
          assert.strictEqual(res.body.title, newBlog.title);
          assert.strictEqual(res.body.author, newBlog.author);
          assert.strictEqual(res.body.user, userId);
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
        .auth(token, { type: "bearer" })
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
      await api
        .post("/api/blogs")
        .auth(token, { type: "bearer" })
        .send(newBlog)
        .expect(400);

      const noTitle = {
        author: "no title",
      };
      await api
        .post("/api/blogs")
        .auth(token, { type: "bearer" })
        .send(noTitle)
        .expect(400)
        .expect((res) => {
          assert(res.body.message.includes("Path `title` is required"));
        });

      const noAuthor = {
        title: "no author",
      };
      await api
        .post("/api/blogs")
        .auth(token, { type: "bearer" })
        .send(noAuthor)
        .expect(400)
        .expect((res) => {
          assert(res.body.message.includes("Path `author` is required"));
        });
    });
  });
  describe("3- deleting posts", () => {
    it("deletes a post correctly by its _id", async () => {
      let id;
      await api.get("/api/blogs").expect((res) => {
        id = res.body[0]._id;
      });
      await api
        .delete(`/api/blogs/${id}`)
        .auth(token, { type: "bearer" })
        .expect(204);
      await api.get("/api/blogs").expect((res) => {
        assert.strictEqual(res.body.length, initialBlogs.length - 1);
      });
    });
  });
  describe("4- updating posts", () => {
    it("updates a post correctly by its _id", async () => {
      let id;
      let title = "updated title";

      await api.get("/api/blogs").expect((res) => {
        id = res.body[0]._id;
      });
      await api
        .patch(`/api/blogs/${id}`)
        .auth(token, { type: "bearer" })
        .send({ title: title })
        .expect(200)
        .expect((res) => {
          assert.strictEqual(res.body.title, title);
        });
      await api.get("/api/blogs").expect((res) => {
        assert.strictEqual(res.body.length, initialBlogs.length);
      });
    });
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});
