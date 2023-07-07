
const conversion = (weather_data) => {

    let weather_data_geojson = {
        "type": "FeatureCollection",
        "features": []
    }

    weather_data.forEach((airport) => {

        let airport_geojson = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [airport.station.geometry.coordinates[0], airport.station.geometry.coordinates[1]]
            },
            "properties": {

            }
        }

        if (airport.barometer !== undefined) {
            airport_geojson.properties.Pressure = airport.barometer.hpa
        } else { airport_geojson.properties.Pressure = null }
        if (airport.clouds[0] !== undefined) {
            airport_geojson.properties["Cloud 1st Layer"] = `${airport.clouds[0].code}, ${airport.clouds[0].meters}`
        } else { airport_geojson.properties["Cloud 1st Layer"] = null }
        if (airport.clouds[1] !== undefined) {
            airport_geojson.properties["Cloud 2nd Layer"] = `${airport.clouds[1].code}, ${airport.clouds[1].meters}`
        } else { airport_geojson.properties["Cloud 2nd Layer"] = null }
        if (airport.clouds[2] !== undefined) {
            airport_geojson.properties["Cloud 3rd Layer"] = `${airport.clouds[2].code}, ${airport.clouds[2].meters}`
        } else { airport_geojson.properties["Cloud 3rd Layer"] = null }
        if (airport.dewpoint !== undefined) {
            airport_geojson.properties.Dewpoint = airport.dewpoint.celsius
        } else { airport_geojson.properties.Dewpoint = null }
        if (airport.humidity !== undefined) {
            airport_geojson.properties.Humidity = airport.humidity.percent
        } else { airport_geojson.properties.Humidity = null }
        if (airport.icao !== undefined) {
            airport_geojson.properties["ICAO code"] = airport.icao
        } else { airport_geojson.properties["ICAO code"] = null }
        if (airport.observed !== undefined) {
            airport_geojson.properties["Observed D/T"] = airport.observed
        } else { airport_geojson.properties["Observed D/T"] = null }
        if (airport.station.location !== undefined) {
            airport_geojson.properties.Location = airport.station.location
        } else { airport_geojson.properties.Location = null }
        if (airport.station.name !== undefined) {
            airport_geojson.properties["Name of airport"] = airport.station.name
        } else { airport_geojson.properties["Name of airport"] = null }
        if (airport.temperature !== undefined) {
            airport_geojson.properties.Temperature = airport.temperature.celsius
        } else { airport_geojson.properties.Temperature = null }
        if (airport.visibility !== undefined) {
            airport_geojson.properties.Visibility = airport.visibility.meters
        } else { airport_geojson.properties.Visibility = null }
        if (airport.wind !== undefined) {
            airport_geojson.properties["Wind Direction"] = airport.wind.degrees
        } else { airport_geojson.properties["Wind Direction"] = null }
        if (airport.wind !== undefined) {
            airport_geojson.properties["Wind Speed"] = airport.wind.speed_kts
        } else { airport_geojson.properties["Wind Speed"] = null }
        if (airport.conditions !== undefined) {
            airport_geojson.properties.Conditions = airport.conditions[0].text
        } else { airport_geojson.properties.Conditions = null }
        if (airport.flight_category !== undefined) {
            airport_geojson.properties["Flight Category"] = airport.flight_category
        } else { airport_geojson.properties["Flight Category"] = null }

        weather_data_geojson.features.push(airport_geojson)


    })

    return JSON.stringify(weather_data_geojson)

}

module.exports = { conversion }
