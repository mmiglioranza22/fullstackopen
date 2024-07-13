const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const commentsRouter = require("./comments");
// https://expressjs.com/en/4x/api.html#express.router
// https://stackoverflow.com/questions/72395842/using-express-mergeparams-with-typescript
// https://gist.github.com/zcaceres/f38b208a492e4dcd45f487638eff716c
blogRouter.use("/:id/comments", commentsRouter);

blogRouter.get("/all", async (request, response, next) => {
  try {
    const blogs = await Blog.find().populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});
blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({ user: request.userId }).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    const payload = { ...request.body, user: user.id };
    const blog = await new Blog(payload).save();

    user.blogs = user.blogs.concat(blog._id);
    await user.save();

    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const [user, blog] = await Promise.all([
      User.findById(request.userId),
      Blog.findById(request.params.id),
    ]);

    if (blog?.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      user.blogs = user.blogs.filter((blog) => blog._id !== request.params.id);
      await user.save();

      response.status(200).json({ _id: request.params.id });
    } else {
      response.status(403).json({
        error: "user is not the creator of the blog and can't delete it",
      });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.patch("/:id", async (request, response, next) => {
  try {
    const [user, blog] = await Promise.all([
      User.findById(request.userId),
      Blog.findById(request.params.id),
    ]);

    if (blog?.user.toString() === user.id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        },
      ).populate("user", {
        name: 1,
      });
      user.blogs = user.blogs.map((blog) => {
        if (blog._id === request.params.id) {
          return updatedBlog;
        } else {
          return blog;
        }
      });
      await user.save();
      response.status(200).json(updatedBlog);
    } else {
      response.status(403).json({
        error: "user is not the creator of the blog and can't delete it",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
