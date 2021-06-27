require("dotenv").config();

const PORT = process.env.PORT;
const MONGOURI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGOURI
    : process.env.MONGOURI;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = { PORT, MONGOURI, TOKEN_SECRET };
