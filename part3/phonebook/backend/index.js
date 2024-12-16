require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const getNewDate = () => {
    return new Date().toString();
};
/*
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
*/

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    })
        .catch(error => {
            console.log(error.message);
        });
});

app.get('/info', (request, response, next) => {
    Person.find({}).then(persons => {
        const peopleInfo = persons.length;
        const reqTime = getNewDate();
        const message = `<p>Phonebook has info for ${peopleInfo} people</p> 
        <p>${reqTime}</p>`;
        response.send(message);
    })
    .catch(error => next(error));
    /*
    const peopleInfo = persons.length;
    const reqTime = getNewDate();
    const message = `<p>Phonebook has info for ${peopleInfo} people</p>
    <p>${reqTime}</p>`;

    response.send(message);
    */
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person);
        } else {
            response.status(404).end();
        };
    })
    .catch(error => next(error));
    /*
    const id = Number(request.params.id);
    const person = persons.find(el => el.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).json({ error: 'Person not found' });
    };
    */
});

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        };
    })
        .catch(error => {
            console.log(error.message);
        });
    /*
    const id = Number(request.params.id);
    persons = persons.filter(el => el.id !== id);
    response.status(200).json({ message: `Person with ID ${id} was deleted successfully.` });
    */
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        });
    }
    /*
    const nameExists = persons.some(person => person.name === body.name);
    if (nameExists) {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }
    
    const newId = Math.floor(Math.random() * 1000000);
    const newPerson = {
        id: newId,
        name: body.name,
        number: body.number
    };

    persons = persons.concat(newPerson);
    response.status(201).json(newPerson);
    */

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        response.statusCode = 201;
        response.json(savedPerson);
    })
    .catch(error => {
        console.log(error.message);
        response.status(400).json({ error: error.message });
    });
});

app.put(('/api/persons/:id'), (request, response, next) => {
    const { name, number } = request.body;

    Person.findByIdAndUpdate(request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            response.json(updatedPerson);
        })
        .catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    };
    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});