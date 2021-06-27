const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const config = require("./config.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const initialUsers = [
  {
    username: "haru",
    name: "haru",
    password: "password",
    passwordHash: "werwetjwertgjerwtjerwtjer",
  },
  {
    username: "adi",
    name: "adi",
    passwordHash: "werwetjwertgjerwtjerwtjer",
  },
  {
    username: "panda",
    name: "panda",
    passwordHash: "werwetjwertgjerwtjerwtjer",
  },
  {
    username: "salmon",
    name: "salmon",
    passwordHash: "werwetjwertgjerwtjerwtjer",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const validUserToken = async () => {
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    username: crypto.randomBytes(4).toString("hex"),
    name: "testy",
    passwordHash,
  });

  const returnedUser = await user.save();

  const userForToken = {
    username: returnedUser.username,
    id: returnedUser._id,
  };

  const token = jwt.sign(userForToken, config.TOKEN_SECRET);
  return token;
};

module.exports = { usersInDb, initialUsers, validUserToken };
