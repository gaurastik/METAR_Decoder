var temp_myButton = document.getElementById('temperature')
var temp_isActive = false
function getColortemp(d) {
    return d > 35 ? '#bd0026' :
        d > 30 ? '#f03b20' :
            d > 25 ? '#fd8d3c' :
                d > 20 ? '#fecc5c' :
                    '#ffffb2';
}

const temp_startEvent = () => {

    if (!temp_isActive) {
        temp_isActive = true
        temp_myButton.classList.add('clicked')

        layer_INDIA_STATES_0.eachLayer((layer) => {
            layer.setStyle({
                fillColor: 'rgba(35,35,35,1.0)',
                color: 'rgba(166,206,227,1.0)'

            })
        })

        airport_points.forEach(element => {

            if (element.feature.properties.Temperature <= 20) {
                var icon = L.icon({ iconUrl: './legend/ffffb2.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (20 < element.feature.properties.Temperature && element.feature.properties.Temperature <= 25) {
                var icon = L.icon({ iconUrl: './legend/fecc5c.png', iconSize: [10, 10] })
                element.setIcon(icon)

            } else if (25 < element.feature.properties.Temperature && element.feature.properties.Temperature <= 30) {
                var icon = L.icon({ iconUrl: './legend/fd8d3c.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (30 < element.feature.properties.Temperature && element.feature.properties.Temperature <= 35) {
                var icon = L.icon({ iconUrl: './legend/f03b20.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else {
                var icon = L.icon({ iconUrl: './legend/bd0026.png', iconSize: [10, 10] })
                element.setIcon(icon)
            }
            element.bindTooltip(`${element.feature.properties.Temperature}° C`, { className: 'my-tooltip' })

        });

        legend.onAdd = (map) => {
            console.log('hello')
            var div = L.DomUtil.create('div', 'info legend')
            var grades = [0, 20, 25, 30, 35]

            for (var i = 0; i < grades.length; i++) {

                div.innerHTML +=
                    '<i style="background:' + getColortemp(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] + '° C' + '<br>' : '+' + '° C');
            }

            return div
        }

        legend.addTo(map)


    } else {
        layer_INDIA_STATES_0.eachLayer((layer) => {
            layer_INDIA_STATES_0.resetStyle(layer)
        })

        temp_myButton.classList.remove("clicked")
        temp_isActive = false
        legend.remove()
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach((element) => {
            element.setIcon(defaultIcon)
            element.unbindTooltip()
        })

    }

}

temp_myButton.addEventListener('click', temp_startEvent)

