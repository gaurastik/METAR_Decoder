const request = require('request')

const Weather_data = (airport_query_i, callback) => {

    const url = `https://api.checkwx.com/metar/${airport_query_i}/decoded?x-api-key=20cd2ef316fb47789201db7202`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = { Weather_data }