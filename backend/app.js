const weather_API = require('./utils/weather_api')
const conversion = require('./utils/json_to_geojson')
const fs = require('fs')

const airport_query = [
    'VOMM,VOCB,VOMD,VOPC,VOSM,VOTR,VOTK,VOBL,VOBG,VOML,VOMY,VOGB,VOJV,VOHS,VOCP,VOHY,VORY,VOTP,VOBZ,VOTV',
    'VECC,VECO,VEDG,VEBD,VEBS,VEJH,VEPY,VEPT,VEGY,VEJS,VERC,VOKN,VOCL,VOCI,VETZ,VEAT,VELP,VEBI,VEIM,VELR',
    'VEMR,VEMN,VASU,VAAH,VABO,VABV,VAKE,VAPR,VARK,VADU,VASD,VABB,VAAU,VAJL,VAJJ,VERP,VABP,VAID,VAJB,VIJR',
    'VANP,VEBN,VIBR,VIGG,VISM,VIJU,VISR,VAUD,VILK,VIJP,VIDN,VIAR,VIDP']
let weather_data_json = []

for (let i = 0; i < 4; i++) {
    weather_API.Weather_data(airport_query[i], (error, data) => {
        if (error) {
            console.log(error)

        } else {
            data.data.forEach(station => {
                weather_data_json.push(station)
            });
            if (weather_data_json.length == 73) {
                const raw_data = JSON.stringify(weather_data_json)
                fs.writeFileSync('weather_data_raw.json', raw_data)
                fs.writeFileSync('weather_data.json', conversion.conversion(weather_data_json))
            }


        }
    })

}


