const weather_API = require('./utils/weather_api')
const conversion = require('./utils/json_to_geojson')
const fs = require('fs')

// const airport_query = [
//     'VABB,VABJ,VABM,VABO,VABP,VABV,VADN,VADS,VADZ,VAGO,VAGZ,VAHB,VAJM,VAKD,VAKJ,VAKP,VAKS,VAND,VANP,VARP',
//     'VASL,VASU,VASX,VATT,VAUD,VAXB,VDBG,VDBI,VDBK,VDBN,VDPP,VEAN,VEAT,VEBA,VEBD,VEBG,VEBL,VEBM,VEBS,VEBZ',
//     'VECC,VECX,VEDB,VEDG,VEDZ,VEGK,VEGT,VEIM,VEJT,VEKR,VEKU,VEKW,VEMG,VEMH,VEMN,VEMS,VEMZ,VEPH,VEPT,VEPU',
//     'VERC,VERK,VETJ,VETZ,VEUO,VEVZ,VEWL,VGBR,VGCB,VGEG,VGFN,VGHS,VGIH,VGIS,VGJR,VGLM,VGNU,VGRJ,VGSD,VGSY',
//     'VGZR,VHLD,VIAG,VIAL,VIAR,VIBK,VIBL,VIBN,VIBR,VIBT,VIBY,VIDD,VIDE,VIDF,VIDN,VIGR,VIHR,VIHX,VIJN,VIJO',
//     'VIJP,VIJR,VIKO,VILD,VILK,VILR,VISM,VISR,VIST,VIUL,VIUX,VIZR,VOBG,VOBZ,VOCC,VOCI,VOCX,VODG,VODK,VODL',
//     'VODX,VOHY,VOJP,VOMD,VOML,VOMM,VOMR,VONS,VOPB,VOPC,VOPN,VOTP,VOTR,VOTV,VOTX,VAPO ']

const airport_query = [
    'VOMM,VOCB,VOMD,VOPC,VOSM,VOTR,VOTK,VOBL,VOBG,VOML,VOMY,VOGB,VOJV,VOHS,VOCP,VOHY,VORY,VOTP,VOBZ,VOTV',
    'VECC,VECO,VEDG,VEBD,VEBS,VEJH,VEPY,VEPT,VEGY,VEJS,VERC,VOKN,VOCL,VOCI,VETZ,VEAT,VELP,VEBI,VEIM,VELR',
    'VEMR,VEMN,VASU,VAAH,VABO,VABV,VAKE,VAPR,VARK,VADU,VASD,VABB,VAAU,VAJL,VAJJ,VERP,VABP,VAID,VAJB,VIJR',
    'VANP,VEBN,VIBR,VIGG,VISM,VIJU,VISR,VAUD,VILK,VIJP,VIDN,VIAR,VIDP,VAPO']

let weather_data_json = []
let pass = 0
for (let i = 0; i < 7; i++) {
    weather_API.Weather_data(airport_query[i], (error, data) => {
        if (error) {
            console.log(error)

        } else {
            data.data.forEach(station => {
                weather_data_json.push(station)
            });
            pass += 1
            if (pass == 7) {
                console.log(weather_data_json.length)
                const raw_data = JSON.stringify(weather_data_json)
                fs.writeFileSync('weather_data_raw.json', raw_data)
                const weather_data_final = `var json_airport_1 = ${conversion.conversion(weather_data_json)}`
                fs.writeFileSync('weather_data.js', weather_data_final)
            }


        }
    })

}


