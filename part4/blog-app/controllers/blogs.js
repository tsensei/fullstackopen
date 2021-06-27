const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");
const middleware = require("../utils/middleware.js");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    if (!(body.title || body.url)) {
      return response.status(400).end();
    }
    const blog = new Blog({
      title: body.title,
      author: request.user.name,
      url: body.url,
      likes: body.likes || 0,
      user: request.user._id,
    });

    const user = request.user;
    user.blogs = user.blogs.concat(blog.id);
    await user.save();

    const result = await blog.save();
    response.status(201).json(result);
  }
);

blogsRouter.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body;
    if (!(body.title || body.url)) {
      return response.status(400).end();
    }
    const blog = {
      title: body.title,
      author: request.user.name,
      url: body.url,
      likes: body.likes || 0,
      user: request.user._id,
    };
    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(returnedBlog);
  }
);

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === request.user.id) {
      blog.remove();
      const user = request.user;
      user.blogs = user.blogs.filter((item) => item !== request.params.id);
      await user.save();
      response.status(204).end();
    } else {
      response
        .status(403)
        .json({ error: "You dont have access to this resource" });
    }
  }
);

module.exports = blogsRouter;
