const weather_API = require('./utils/weather_api')


weather_API.Weather_data((error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})