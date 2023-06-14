const request = require('request')


const Weather_data = (callback) => {

    const url = 'https://api.checkwx.com/metar/VIDP,VABB,VOBL,VOHS,VOMM,VECC,VAAH,VOCI,VOGO,VAPO,VILK,VEGT,VIJP,VISR,VEPT,VICG,VEBS,VOTV,VOCL,VAID/decoded?x-api-key=20cd2ef316fb47789201db7202'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = { Weather_data }