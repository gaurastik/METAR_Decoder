var wind_myButton = document.getElementById('wind')
var wind_isActive = false

const wind_startEvent = () => {

    if (!wind_isActive) {

        wind_myButton.classList.add('clicked')

        var wind_markers = []
        airport_points.forEach(element => {
            var icon = L.WindBarb.icon({ lat: element.feature.geometry.coordinates[1], deg: element.feature.properties["Wind Direction"], speed: element.feature.properties["Wind Speed"], pointRadius: 5, strokeLength: 20 });
            element.setIcon(icon)
            element.bindTooltip(`${element.feature.properties["Wind Direction"]}°/ ${element.feature.properties["Wind Speed"]} kts`, { className: 'my-tooltip' })

        });

        wind_isActive = true

    } else {
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach(element => {
            element.setIcon(defaultIcon)
            element.unbindTooltip()
        })
        wind_myButton.classList.remove("clicked")
        wind_isActive = false
    }

}

wind_myButton.addEventListener('click', wind_startEvent)

