const express = require("express");
const app = express();

const getNewDate = () => {
    return new Date().toString();
};

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Mary Poppendieck2",
        "number": "39-23-64231222"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/info', (request, response) => {
    const peopleInfo = persons.length;
    const reqTime = getNewDate();
    const message = `<p>Phonebook has info for ${peopleInfo} people</p>
    <p>${reqTime}</p>`;

    response.send(message);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(el => el.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).json({ error: "Person not found" });
    };
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(el => el.id !== id);
    response.status(200).json({ message: `Person with ID ${id} was deleted successfully.` });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});