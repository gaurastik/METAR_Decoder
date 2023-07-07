const express = require('express')
const path = require('path')
const app = express()
const request = require('request')
const weather_API = require('../utils/weather_api')
const geojson_file = require('../utils/json_to_geojson')
//testing
const fs = require('fs')

const airport_query = [
    'VOMM,VOCB,VOMD,VOPC,VOSM,VOTR,VOTK,VOBL,VOBG,VOML,VOMY,VOGB,VOJV,VOHS,VOCP,VOHY,VORY,VOTP,VOBZ,VOTV',
    'VECC,VECO,VEDG,VEBD,VEBS,VEJH,VEPY,VEPT,VEGY,VEJS,VERC,VOKN,VOCL,VOCI,VETZ,VEAT,VELP,VEBI,VEIM,VELR',
    'VEMR,VEMN,VASU,VAAH,VABO,VABV,VAKE,VAPR,VARK,VADU,VASD,VABB,VAAU,VAJL,VAJJ,VERP,VABP,VAID,VAJB,VIJR',
    'VANP,VEBN,VIBR,VIGG,VISM,VIJU,VISR,VAUD,VILK,VIJP,VIDN,VIAR,VIDP,VAPO']

const frontend_dir_path = path.join(__dirname, '../public')

app.get('/', (req, res, next) => {

    let weather_data_json = []
    let pass = 0
    for (let i = 0; i < 4; i++) {
        weather_API.Weather_data(airport_query[i], (error, data) => {
            if (error) {
                res.send(error)
            } else {
                fs.writeFileSync(`${frontend_dir_path}/data/airport_1_raw.js`, JSON.stringify(data))
                data.data.forEach(station => {
                    weather_data_json.push(station)
                })
            }
            pass += 1
            if (pass == 4) {

                const final = `var json_airport_1 = ${geojson_file.conversion(weather_data_json)}`
                fs.writeFileSync(`${frontend_dir_path}/data/airport_1.js`, final)

            }
        })
    }
    next()
})

app.use(express.static(frontend_dir_path))
console.log(frontend_dir_path)
app.listen(3000, () => {
    console.log("Server is up and running!")
})