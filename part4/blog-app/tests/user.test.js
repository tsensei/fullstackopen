const mongoose = require("mongoose");
const app = require("../app.js");
const supertest = require("supertest");
const api = supertest(app);
const User = require("../models/user.js");
const helper = require("../utils/user_helper.js");

jest.setTimeout(100000);

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    const newUser = new User(user);
    await newUser.save();
  }
});

describe("Adding users", () => {
  test("Invalid users are not saved", async () => {
    const initialUsers = await helper.usersInDb();
    const user = {
      username: "ha",
      name: "ha",
      password: "123rewrewa",
    };
    await api.post("/api/users").send(user).expect(400);

    const finalUsers = await helper.usersInDb();

    expect(finalUsers).toHaveLength(initialUsers.length);
  });

  test("Invalid add user operation responds with appropriate status code and message", async () => {
    const user = {
      username: "ha",
      name: "ha",
      password: "1234",
    };

    const response = await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(response.body.error).toContain(
      "Username and password should be atleast 3 characters long"
    );
  });
});

afterAll(() => {
  mongoose.connection.close();
});
