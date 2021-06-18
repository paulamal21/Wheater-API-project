const fetch = require('node-fetch');
require('dotenv').config();

// const APPID = '26ce49868b1b0ce8e6e9132a5c7e3d0c';
// const url = `http://api.openweathermap.org/data/2.5/weather?q=${location},${countryCode}&units=metric&appid=${process.env.APPID}`;

const getWeather = async(location=process.env.location, countryCode=process.env.location) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APPID}&units=metric`;
    let data = await fetch(url);
    return await data.json();
}


module.exports = getWeather;