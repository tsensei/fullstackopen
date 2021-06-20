const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/phonebook.js");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// morgan.token("body", (req, res) => JSON.stringify(req.body));
// app.use(
//   morgan(
//     ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
//   )
// );

const requestLogger = (req, res, next) => {
  console.log("........");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Body:", req.body);
  console.log("........");
  next();
};

app.use(requestLogger);

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(
      `<div>
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${new Date().toGMTString()}</p>
        </div>`
    );
  });
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((returnedPerson) => res.json(returnedPerson))
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((returnedPerson) => {
      res.json(returnedPerson);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  console.log("update person", person.name, person.number);
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((returnedPerson) => {
      console.log(returnedPerson);
      res.json(returnedPerson);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  console.log("called");
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: "Successfully deleted" }))
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
