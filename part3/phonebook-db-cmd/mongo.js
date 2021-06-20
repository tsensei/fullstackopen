const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const mongooseConnect = async () => {
  const password = process.argv[2];
  const url = `mongodb+srv://tsensei:${password}@cluster0.nc4ho.mongodb.net/phonebook-db?retryWrites=true&w=majority`;

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  console.log("Connected");
};

if (process.argv.length === 3) {
  (async () => {
    await mongooseConnect();
    console.log("Phonebook:");
    const persons = await Person.find({});

    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  })();
} else if (process.argv.length === 5) {
  (async () => {
    await mongooseConnect();
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
      name,
      number,
    });
    const returnedPerson = await person.save();
    console.log(
      `added ${returnedPerson.name} number ${returnedPerson.number} to phonebook`
    );
    mongoose.connection.close();
  })();
} else {
  console.log(
    "Please enter required fields: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}
