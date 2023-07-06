var visi_myButton = document.getElementById('visibility')
var visi_isActive = false


var visi_startEvent = () => {
    if (!visi_isActive) {

        visi_myButton.classList.add('clicked')

        airport_points.forEach(element => {

            if (element.feature.properties.Visibility == "10,000+") {
                element.setStyle({ fillColor: "#000ff" })
            } else if (4000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 10000) {
                element.setStyle({ fillColor: "#4000bf" })
            } else if (2000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 4000) {

                element.setStyle({ fillColor: "#6a0095" })
            } else if (1000 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 2000) {

                element.setStyle({ fillColor: "#95006a" })
            } else if (500 <= parseInt(element.feature.properties.Visibility.replace(',', '')) && parseInt(element.feature.properties.Visibility.replace(',', '')) < 1000) {

                element.setStyle({ fillColor: "#bf0040" })
            } else {

                element.setStyle({ fillColor: "#ff0000" })
            }

        });

        visi_isActive = true

    } else {
        visi_myButton.classList.remove("clicked")
        visi_isActive = false
        airport_points.forEach((element) => {
            element.setStyle({ fillColor: 'rgba(255,245,240,1.0)' })
        })

    }

}

visi_myButton.addEventListener('click', visi_startEvent)