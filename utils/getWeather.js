const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function getWeather(city, state, country) {
    const options = {
        method: 'GET',
        url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
        params: {
            city: city,
            state: state,
            country: country
        },
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const data = await axios.request(options);
        return data;
    } 
    catch (error) {
        console.error(error);
    }
}


module.exports = getWeather;