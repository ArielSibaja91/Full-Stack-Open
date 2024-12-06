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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});