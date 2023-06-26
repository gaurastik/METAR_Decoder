const express = require('express')
const path = require('path')
const app = express()
const request = require('request')
const weather_API = require('../utils/weather_api')
const geojson_file = require('../utils/json_to_geojson')
//test
const fs = require('fs')

const airport_query = [
    'VOMM,VOCB,VOMD,VOPC,VOSM,VOTR,VOTK,VOBL,VOBG,VOML,VOMY,VOGB,VOJV,VOHS,VOCP,VOHY,VORY,VOTP,VOBZ,VOTV',
    'VECC,VECO,VEDG,VEBD,VEBS,VEJH,VEPY,VEPT,VEGY,VEJS,VERC,VOKN,VOCL,VOCI,VETZ,VEAT,VELP,VEBI,VEIM,VELR',
    'VEMR,VEMN,VASU,VAAH,VABO,VABV,VAKE,VAPR,VARK,VADU,VASD,VABB,VAAU,VAJL,VAJJ,VERP,VABP,VAID,VAJB,VIJR',
    'VANP,VEBN,VIBR,VIGG,VISM,VIJU,VISR,VAUD,VILK,VIJP,VIDN,VIAR,VIDP']

const frontend_dir_path = path.join(__dirname, '../public')

app.use(express.static(frontend_dir_path))

app.get('/:variableRootURL/:variableRootURL/:variableRootURL', (req, res) => {

    let weather_data_json = []
    for (let i = 0; i < 4; i++) {
        weather_API.Weather_data(airport_query[i], (error, data) => {
            if (error) {
                res.send(error)
            } else {
                data.data.forEach(station => {
                    weather_data_json.push(station)
                })
            }
            if (weather_data_json.length == 73) {
                const final = geojson_file.conversion(weather_data_json)
                res.send(final)
            }
        })
    }
})


app.listen(3000, () => {
    console.log("Server is up and running!")
})