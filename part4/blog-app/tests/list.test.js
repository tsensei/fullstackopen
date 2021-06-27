const mongoose = require("mongoose");
const app = require("../app.js");
const supertest = require("supertest");
const api = supertest(app);
const helper = require("../utils/list_helper");
const userHelper = require("../utils/user_helper");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const crypto = require("crypto");

jest.setTimeout(100000);

beforeEach(async () => {
  const users = await User.find({});
  const user = users[0];
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    const formattedBlog = {
      ...blog,
      user: user._id,
    };
    const newBlog = new Blog(formattedBlog);
    await newBlog.save();
  }
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");

    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const blogs = await api.get("/api/blogs");

    const content = blogs.body.map((b) => b.title);
    expect(content).toContain("Create an express app");
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const returnedBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(returnedBlog.body).toEqual(processedBlogToView);
  });

  test("fails with statuscode 404 if does not exist", async () => {
    const id = await helper.validNonexistingId();
    await api.get(`/api/blogs/${id}`).expect(404);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const authtoken = await userHelper.validUserToken();
    const blog = {
      title: "whatever111111",
      url: "whatever.com",
    };
    const returnedBlog = await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + authtoken)
      .send(blog)
      .expect(201);

    expect(returnedBlog.body.title).toBe("whatever111111");

    const allBlogs = await helper.blogsInDb();

    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("fails with status code 400 if data invalid", async () => {
    const blog = {
      author: "tsensei",
      likes: 500,
    };
    const authtoken = await userHelper.validUserToken();

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + authtoken)
      .send(blog)
      .expect(400);
  });

  test("fails with status code 401 if auth not defined", async () => {
    const blog = {
      author: "tsensei",
      likes: 500,
    };

    await api.post("/api/blogs").send(blog).expect(401);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const authtoken = await userHelper.validUserToken();

    const blog = {
      title: crypto.randomBytes(3).toString("hex"),
      url: "whatever.com",
    };

    const returnedBlog = await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + authtoken)
      .send(blog)
      .expect(201);

    await api
      .delete(`/api/blogs/${returnedBlog.body.id}`)
      .set("Authorization", "bearer " + authtoken)
      .expect(204);
  });
});

describe("updating", () => {
  test("responds with 200 for valid data", async () => {
    const authtoken = await userHelper.validUserToken();

    const blog = {
      title: crypto.randomBytes(3).toString("hex"),
      url: "whatever.com",
    };

    const retBlog = await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + authtoken)
      .send(blog)
      .expect(201);

    const newBlog = {
      title: "Making a milkshake",
      likes: 69,
    };

    const returnedBlog = await api
      .put(`/api/blogs/${retBlog.body.id}`)
      .set("Authorization", "bearer " + authtoken)
      .send(newBlog)
      .expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
