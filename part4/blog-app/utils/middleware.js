const logger = require("./logger.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("./config.js");

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.TOKEN_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  req.user = user;
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    req.token = authorization.split(" ")[1];
    next();
  } else {
    return res.status(401).json({ error: "Token missing" });
  }
};

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("...");

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ message: "Unknown Endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ message: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
