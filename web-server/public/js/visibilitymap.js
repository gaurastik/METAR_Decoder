var visi_myButton = document.getElementById('visibility')
var legend = L.control({ position: 'bottomright' })
function getColorvisi(d) {
    return d > 10000 ? '#253494' :
        d > 6000 ? '#2c7fb8' :
            d > 4000 ? '#41b6c4' :
                d > 1000 ? '#a1dab4' :
                    '#ffffcc';
}

var visi_startEvent = () => {

    if (!visi_isActive) {
        visi_isActive = true
        visi_myButton.classList.add('clicked')

        layer_INDIA_STATES_0.eachLayer((layer) => {
            layer.setStyle({
                fillColor: 'rgba(35,35,35,1.0)',
                color: 'rgba(166,206,227,1.0)'

            })
        })

        airport_points.forEach(element => {

            if (element.feature.properties.Visibility == "10,000+") {
                var icon = L.icon({ iconUrl: './legend/253494.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (6000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 10000) {
                var icon = L.icon({ iconUrl: './legend/2c7fb8.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (4000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 6000) {
                var icon = L.icon({ iconUrl: './legend/41b6c4.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (1000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 4000) {
                var icon = L.icon({ iconUrl: './legend/a1dab4.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else {
                var icon = L.icon({ iconUrl: './legend/ffffcc.png', iconSize: [10, 10] })
                element.setIcon(icon)
            }
            element.bindTooltip(`${element.feature.properties.Visibility}m`, { className: 'my-tooltip' })
        });


        legend.onAdd = (map) => {
            console.log('hello')
            var div = L.DomUtil.create('div', 'info legend')

            var grades = [0, 1000, 4000, 6000, 10000]

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColorvisi(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? ' - ' + grades[i + 1] + ' m' + '<br>' : '+' + ' m');

            }

            return div
        }

        legend.addTo(map)


    } else {

        layer_INDIA_STATES_0.eachLayer((layer) => {
            layer_INDIA_STATES_0.resetStyle(layer)
        })

        visi_myButton.classList.remove("clicked")
        visi_isActive = false
        legend.remove()
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach((element) => {
            element.setIcon(defaultIcon)
            element.unbindTooltip()
        })

    }

}

visi_myButton.addEventListener('click', visi_startEvent)