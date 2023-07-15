var humid_myButton = document.getElementById('humidity')

var humid_layer0 = null

var humid_startEvent = () => {
    if (!humid_isActive) {
        humid_myButton.classList.add('clicked')

        var humid_markers = []
        json_airport_1.features.forEach(element => {
            var marker = L.circleMarker([element.geometry.coordinates[1], element.geometry.coordinates[0]], { radius: element.properties.Humidity / 5, color: '#051937', fillOpacity: 0.8 })
            marker.bindTooltip(`${element.properties.Humidity}%`, { className: 'my-tooltip' })
            humid_markers.push(marker)
        })

        airport_points.forEach(element => {
            var icon = L.icon({ iconUrl: './legend/white_circle.png', iconSize: [10, 10], })
            element.setIcon(icon)
        })

        var Humid_layer = L.layerGroup(humid_markers).addTo(map)

        map.getPanes().overlayPane.style.zIndex = 401
        humid_isActive = true
        humid_layer0 = Humid_layer

    } else {
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach(element => {
            element.setIcon(defaultIcon)
        })
        humid_myButton.classList.remove("clicked")
        humid_isActive = false
        humid_layer0.onRemove(map)
        humid_layer0 = null
    }

}

humid_myButton.addEventListener('click', humid_startEvent)