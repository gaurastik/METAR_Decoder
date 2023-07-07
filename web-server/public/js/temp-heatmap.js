var temp_myButton = document.getElementById('temperature')
var temp_isActive = false


const temp_startEvent = () => {

    if (!temp_isActive) {
        temp_isActive = true
        temp_myButton.classList.add('clicked')

        airport_points.forEach(element => {

            if (element.feature.properties.Temperature <= 20) {
                element.setStyle({ fillColor: "#000ff" })
            } else if (20 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 25) {
                element.setStyle({ fillColor: "#4000bf" })
            } else if (25 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 30) {

                element.setStyle({ fillColor: "#6a0095" })
            } else if (30 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 35) {

                element.setStyle({ fillColor: "#95006a" })
            } else if (35 <= element.feature.properties.Temperature && element.feature.properties.Temperature < 40) {

                element.setStyle({ fillColor: "#bf0040" })
            } else {

                element.setStyle({ fillColor: "#ff0000" })
            }

        });


    } else {

        temp_myButton.classList.remove("clicked")
        temp_isActive = false
        airport_points.forEach((element) => {
            element.setStyle({ fillColor: 'rgba(255,245,240,1.0)' })
        })

    }

}

temp_myButton.addEventListener('click', temp_startEvent)

