import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_URL;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (latitude, longitude) => {
    const request = axios.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    return request.then((request) => request.data);
};

export { getWeather }