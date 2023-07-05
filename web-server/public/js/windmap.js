var wind_myButton = document.getElementById('wind')
var wind_isActive = false
var wind_layer0 = null

const wind_startEvent = () => {

    if (!wind_isActive) {

        wind_myButton.classList.add('clicked')

        var markers = []
        json_airport_1.features.forEach(element => {
            var icon = L.WindBarb.icon({ lat: element.geometry.coordinates[1], deg: element.properties["Wind Direction"], speed: element.properties["Wind Speed"], pointRadius: 5, strokeLength: 20 });
            var marker = L.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]], { icon: icon })
            markers.push(marker)
        });


        var Wind_layer = L.layerGroup(markers).addTo(map)
        wind_isActive = true
        wind_layer0 = Wind_layer


    } else {

        wind_myButton.classList.remove("clicked")
        wind_isActive = false
        wind_layer0.onRemove(map)
        wind_layer0 = null
    }

}

wind_myButton.addEventListener('click', wind_startEvent)

