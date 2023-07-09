var temp_myButton = document.getElementById('temperature')
var temp_isActive = false


const temp_startEvent = () => {

    if (!temp_isActive) {
        temp_isActive = true
        temp_myButton.classList.add('clicked')

        airport_points.forEach(element => {

            if (element.feature.properties.Temperature <= 20) {
                var icon = L.icon({ iconUrl: './legend/blue.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (20 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 25) {
                var icon = L.icon({ iconUrl: './legend/purple.png', iconSize: [10, 10] })
                element.setIcon(icon)

            } else if (25 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 30) {
                var icon = L.icon({ iconUrl: './legend/megenta.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (30 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 35) {
                var icon = L.icon({ iconUrl: './legend/red.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else {
                var icon = L.icon({ iconUrl: './legend/dred.png', iconSize: [10, 10] })
                element.setIcon(icon)
            }
            element.bindTooltip(`${element.feature.properties.Temperature}° C`, { className: 'my-tooltip' })

        });


    } else {

        temp_myButton.classList.remove("clicked")
        temp_isActive = false
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach((element) => {
            element.setIcon(defaultIcon)
            element.unbindTooltip()
        })

    }

}

temp_myButton.addEventListener('click', temp_startEvent)

