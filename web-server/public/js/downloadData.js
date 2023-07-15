function transposeArray(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

var download_data_button = document.querySelector('#download_data')

var observed_button = document.querySelector('#observed')
var location_button = document.querySelector('#location')
var pressure_button = document.querySelector('#pressure')
var temperature_button = document.querySelector('#temperatureD')
var humidity_button = document.querySelector('#humidityD')
var dewpoint_button = document.querySelector('#dewpoint')
var visibility_button = document.querySelector('#visibilityD')
var cloud1_button = document.querySelector('#cloud1')
var cloud2_button = document.querySelector('#cloud2')
var cloud3_button = document.querySelector('#cloud3')
var wind_button = document.querySelector('#windD')
var conditions_button = document.querySelector('#conditions')
var flightcat_button = document.querySelector('#flightcat')



download_data_button.addEventListener('click', () => {
    var headers = ['Name of airport', 'ICAO code']
    var name_airport = []
    var icao_airport = []
    var observed_airport = []
    var location_airport = []
    var pressure_airport = []
    var temperature_airport = []
    var humidity_airport = []
    var dewpoint_airport = []
    var visibility_airport = []
    var cloud1_airport = []
    var cloud2_airport = []
    var cloud3_airport = []
    var winddir_airport = []
    var windspeed_airport = []
    var condition_airport = []
    var flightcat_airport = []
    var excel_final = []
    var pass = true


    json_airport_1.features.forEach((airport) => {
        name_airport.push(airport.properties["Name of airport"])
        icao_airport.push(airport.properties["ICAO code"])
        if (pass) { excel_final.push(name_airport, icao_airport) }

        if (observed_button.checked) {
            observed_airport.push(airport.properties["Observed D/T"])

            if (pass) { excel_final.push(observed_airport); headers.push('Data Observed D/T') }


        }
        if (location_button.checked) {
            location_airport.push(airport.properties["Location"])

            if (pass) { excel_final.push(location_airport); headers.push('Airport location') }

        }
        if (pressure_button.checked) {
            pressure_airport.push(airport.properties.Pressure)

            if (pass) { excel_final.push(pressure_airport); headers.push('Pressure(hPa)') }

        }
        if (temperature_button.checked) {
            temperature_airport.push(airport.properties.Temperature)

            if (pass) { excel_final.push(temperature_airport); headers.push('Temperature(°C)') }

        }
        if (humidity_button.checked) {
            humidity_airport.push(airport.properties.Humidity)

            if (pass) { excel_final.push(humidity_airport); headers.push('Humidity(%)') }

        }
        if (dewpoint_button.checked) {
            dewpoint_airport.push(airport.properties.Dewpoint)

            if (pass) { excel_final.push(dewpoint_airport); headers.push('Dewpoint(°C)') }

        }
        if (visibility_button.checked) {
            visibility_airport.push(airport.properties.Visibility)

            if (pass) { excel_final.push(visibility_airport); headers.push('Visibility(m)') }

        }
        if (cloud1_button.checked) {
            cloud1_airport.push(airport.properties["Cloud 1st Layer"])

            if (pass) { excel_final.push(cloud1_airport); headers.push('Cloud 1st Layer') }

        }
        if (cloud2_button.checked) {
            cloud2_airport.push(airport.properties["Cloud 2nd Layer"])

            if (pass) { excel_final.push(cloud2_airport); headers.push('Cloud 2nd Layer') }

        }
        if (cloud3_button.checked) {
            cloud3_airport.push(airport.properties["Cloud 3rd Layer"])

            if (pass) { excel_final.push(cloud3_airport); headers.push('Cloud 3rd Layer') }

        }
        if (wind_button.checked) {
            winddir_airport.push(airport.properties["Wind Direction"])
            windspeed_airport.push(airport.properties["Wind Speed"])


            if (pass) { excel_final.push(winddir_airport, windspeed_airport); headers.push('Wind Direction(°)'); headers.push('Wind Speed(kts)') }

        }
        if (conditions_button.checked) {
            condition_airport.push(airport.properties.Conditions)

            if (pass) { excel_final.push(condition_airport); headers.push('Conditions') }

        }
        if (flightcat_button.checked) {
            flightcat_airport.push(airport.properties["Flight Category"])

            if (pass) { excel_final.push(flightcat_airport); headers.push('Flight Category') }

        }
        pass = false

    })
    excel_final = transposeArray(excel_final)
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet([headers])
    XLSX.utils.sheet_add_aoa(worksheet, excel_final, { origin: -1 })
    XLSX.utils.book_append_sheet(workbook, worksheet, "METAR data")
    XLSX.writeFile(workbook, 'METAR_DATA.xlsx');


})
