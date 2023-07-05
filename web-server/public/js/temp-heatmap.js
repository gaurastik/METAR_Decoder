var myButton = document.getElementById('temperature')
var isActive = false
var layer

const startEvent = () => {

    if (!isActive) {

        // $('#temperature').css('background-color', '#0dcaf0')
        // $('#temperature').css('color', 'black')
        myButton.classList.add('clicked')


        testData = {
            max: 50,
            data: []
        }

        json_airport_1.features.forEach(element => {
            let data_point = { lat: element.geometry.coordinates[1], lng: element.geometry.coordinates[0], count: element.properties.Temperature }
            testData.data.push(data_point)
        });



        var cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            "radius": 1,
            "maxOpacity": .8,
            // scales the radius based on map zoom
            "scaleRadius": true,
            // if set to false the heatmap uses the global maximum for colorization
            // if activated: uses the data maximum within the current map boundaries
            // (there will always be a red spot with useLocalExtremas true)
            "useLocalExtrema": true,
            // which field name in your data represents the latitude - default "lat"
            latField: 'lat',
            // which field name in your data represents the longitude - default "lng"
            lngField: 'lng',
            // which field name in your data represents the data value - default "value"
            valueField: 'count'
        };

        var heatmapLayer = new HeatmapOverlay(cfg);

        map.addLayer(heatmapLayer)
        heatmapLayer.setData(testData)
        map.getPanes().overlayPane.style.zIndex = 401
        isActive = true
        layer = heatmapLayer


    } else {
        // $('#temperature').css('background-color', 'white')
        // $('#temperature').css('color', '#0dcaf0')
        myButton.classList.remove("clicked")
        isActive = false
        layer.onRemove(map)
        layer = null
    }

}

myButton.addEventListener('click', startEvent)

