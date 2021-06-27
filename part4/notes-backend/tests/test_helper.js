const Note = require("../models/note.js");
const User = require("../models/user.js");

const initialNote = [
  {
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({
    content: "willremovethissoon",
    date: new Date(),
  });

  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialNote, nonExistingId, notesInDb, usersInDb };
