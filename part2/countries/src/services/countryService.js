import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

const getCountry = () => {
    const request = axios.get(`${baseUrl}/api/all`);
    return request.then(response => response.data)
};

export { getCountry }