const weather_API = require('./utils/weather_api')


weather_API.Weather_data((data) => {
    console.log(data)
})