const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note.js");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

//Get all notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

//Get note by id
app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Add data
app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  // if (!body.content) {
  //   return res.status(400).json({
  //     error: "content missing",
  //   });
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => res.json(savedAndFormattedNote))
    .catch((error) => next(error));
});

//Update note

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Successfully Deleted!" }))
    .catch((err) => next(err));
});

//Delete note by id
// app.delete("/api/notes/:id", (request, response) => {
//   Note.findByIdAndDelete(request.params.id);

//   response.status(204).end();
// });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error); //Delegates error to default express error handler
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
