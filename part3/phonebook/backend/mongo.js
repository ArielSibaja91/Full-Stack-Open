const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Give the password as an argument");
    process.exit(1);
};

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://asibaja91:${password}@cluster0.vfokh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (newName && newNumber) {
    const person = new Person({
        name: newName,
        number: newNumber
    });
    person.save().then(() => {
        console.log(`Added ${newName} number ${newNumber} to phonebook`);
        mongoose.connection.close();
    }).catch(error => {
        console.error('Error saving the person:', error);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    }).catch(error => {
        console.error('Error retrieving persons:', error);
        mongoose.connection.close();
    });
};