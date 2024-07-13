const express = require("express");
const commentsRouter = express.Router({ mergeParams: true });
const Blog = require("../models/blog");

commentsRouter.get("/", async (request, response, next) => {
  console.log({ params: request.params });
  response.status(200).json({ ok: "ok", blogId: request.params.id });
});

commentsRouter.post("/", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        },
      ).populate("user", {
        name: 1,
      });

      response.status(200).json(updatedBlog);
    } else {
      response.status(403).json({
        error: "error while trying to add blog comment",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
