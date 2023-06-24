const weather_API = require('./utils/weather_api')
const fs = require('fs')

const airport_query = [
    'VOMM,VOCB,VOMD,VOPC,VOSM,VOTR,VOTK,VOBL,VOBG,VOML,VOMY,VOGB,VOJV,VOHS,VOCP,VOHY,VORY,VOTP,VOBZ,VOTV',
    'VECC,VECO,VEDG,VEBD,VEBS,VEJH,VEPY,VEPT,VEGY,VEJS,VERC,VOKN,VOCL,VOCI,VETZ,VEAT,VELP,VEBI,VEIM,VELR',
    'VEMR,VEMN,VASU,VAAH,VABO,VABV,VAKE,VAPR,VARK,VADU,VASD,VABB,VAAU,VAJL,VAJJ,VERP,VABP,VAID,VAJB,VIJR',
    'VANP,VEBN,VIBR,VIGG,VISM,VIJU,VISR,VAUD,VILK,VIJP,VIDN,VIAR,VIDP']

for (let i = 0; i < 4; i++) {
    weather_API.Weather_data(airport_query[i], (error, data) => {
        if (error) {
            const error_json = JSON_stringify(error)
            fs.writeFileSync('weather_data.json', error)

        } else {
            const data_json = JSON.stringify(data)
            fs.appendFileSync(`weather_data.json`, data_json)

        }
    })
}
