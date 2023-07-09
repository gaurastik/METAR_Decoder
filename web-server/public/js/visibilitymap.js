var visi_myButton = document.getElementById('visibility')


var visi_startEvent = () => {
    if (!visi_isActive) {
        visi_isActive = true
        visi_myButton.classList.add('clicked')

        airport_points.forEach(element => {

            if (element.feature.properties.Visibility == "10,000+") {
                var icon = L.icon({ iconUrl: './legend/blue.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (6000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 10000) {
                var icon = L.icon({ iconUrl: './legend/purple.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (4000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 6000) {
                var icon = L.icon({ iconUrl: './legend/megenta.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else if (1000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 4000) {
                var icon = L.icon({ iconUrl: './legend/red.png', iconSize: [10, 10] })
                element.setIcon(icon)
            } else {
                var icon = L.icon({ iconUrl: './legend/dred.png', iconSize: [10, 10] })
                element.setIcon(icon)
            }
            element.bindTooltip(`${element.feature.properties.Visibility}m`, { className: 'my-tooltip' })

        });



    } else {
        visi_myButton.classList.remove("clicked")
        visi_isActive = false
        var defaultIcon = new L.Icon.Default()
        airport_points.forEach((element) => {
            element.setIcon(defaultIcon)
            element.unbindTooltip()
        })

    }

}

visi_myButton.addEventListener('click', visi_startEvent)