const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

usersRouter.get("/", async (req, res) => {
  const returnedUsers = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  res.json(returnedUsers);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password, id } = req.body;

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "Username and password should be atleast 3 characters long",
    });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const returnedUser = await user.save();
  res.json(returnedUser);
});

module.exports = usersRouter;
