
let weather_data_geojson = {
    "type": "FeatureCollection",
    "features": []
}
const conversion = (weather_data) => {
    weather_data.forEach((airport) => {

        let airport_geojson = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [airport.station.geometry.coordinates[0], airport.station.geometry.coordinates[1]]
            },
            "properties": {
                "Pressure": airport.barometer.hpa,
                "Cloud 1st Layer": `${airport.clouds[0].code}, ${airport.clouds[0].meters}`,
                //"Cloud 2nd Layer": `${airport.clouds[1].code}, ${airport.clouds[1].meters}`,
                //"Cloud 3rd Layer": `${airport.clouds[2].code}, ${airport.clouds[2].meters}`,
                "Dewpoint": airport.dewpoint.celsius,
                "humidity": airport.humidity.percent,
                "icao": airport.icao,
                "observed ": airport.observed,
                "location": airport.location,
                "name of airport": airport.name,
                "temperature": airport.temperature.celsius,
                "visibility": airport.visibility.meters,
                //"wind direction": airport.wind.degrees,
                //"wind speed": airport.wind.speed_kts,
                //"conditions": airport.conditions.text,
                "flight category": airport.flight_category

            }
        }

        weather_data_geojson.features.push(airport_geojson)


    })
    return JSON.stringify(weather_data_geojson)

}

module.exports = { conversion }
