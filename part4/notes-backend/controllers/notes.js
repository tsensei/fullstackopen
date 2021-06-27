const notesRouter = require("express").Router();
const Note = require("../models/note.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("../utils/config.js");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(8);
  }

  return null;
};

//Get all notes
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  // response.json(notes);
  response.json(notes);
});

//Get note by id
notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note.toJSON());
  } else {
    res.status(404).end();
  }
});

//Add data
notesRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  console.log(token);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  console.log(decodedToken);
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });

  let savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.json(savedNote);
});

//Update note

notesRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
  });
  res.json(updatedNote.toJSON());
});

notesRouter.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "Successfully Deleted!" });
});

//Delete note by id
// notesRouter.delete("/api/notes/:id", (request, response) => {
//   Note.findByIdAndDelete(request.params.id);

//   response.status(204).end();
// });

module.exports = notesRouter;
