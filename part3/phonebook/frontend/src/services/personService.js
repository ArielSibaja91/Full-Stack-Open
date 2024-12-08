import axios from 'axios';

const baseUrl = '/api/persons';

const getPersons = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const addPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

const updatePerson = (id, updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObject);
    return request.then((response) => response.data);
};

export default { getPersons, addPerson, deletePerson, updatePerson };