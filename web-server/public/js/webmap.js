var visi_isActive = false
var temp_isActive = false
var wind_isActive = false
var humid_isActive = false

//Create Map
var map = L.map('map', {
    zoomControl: true,
    maxZoom: 28,
    minZoom: 1
}).setView([22.958, 78.112], 5);  // Set the center coordinates of India [latitude, longitude] and zoom level
//Info control
var info = L.control()

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info')
    this.update()
    return this._div
}

info.update = function (props) {
    if (visi_isActive) {
        this._div.innerHTML = '<h4>Aerodome Visibility data</h4>' + (props ?
            '<b>' + props['Name of airport'] + '</b><br />' + 'Observed(D/T): ' + props['Observed D/T'] + '<br />' + 'Visibility: ' + props.Visibility + ' m'
            : 'Hover over an airport');
    } else if (temp_isActive) {
        this._div.innerHTML = '<h4>Aerodome Temperature data</h4>' + (props ?
            '<b>' + props['Name of airport'] + '</b><br />' + 'Observed(D/T): ' + props['Observed D/T'] + '<br />' + 'Temperature: ' + props.Temperature + '° C'
            : 'Hover over an airport');
    } else if (wind_isActive) {
        this._div.innerHTML = '<h4>Aerodome Wind data</h4>' + (props ?
            '<b>' + props['Name of airport'] + '</b><br />' + 'Observed(D/T): ' + props['Observed D/T'] + '<br />' + 'Wind Direction: ' + props["Wind Direction"] + '°' + '<br />' + 'Wind Speed: ' + props["Wind Speed"] + ' kts'
            : 'Hover over an airport');
    } else if (humid_isActive) {
        this._div.innerHTML = '<h4>Aerodome Humidity data</h4>' + (props ?
            '<b>' + props['Name of airport'] + '</b><br />' + 'Observed(D/T): ' + props['Observed D/T'] + '<br />' + 'Humidity: ' + props.Humidity + ' %'
            : 'Hover over an airport');
    } else {
        this._div.innerHTML = '<h4>Aerodome information</h4>' + (props ?
            '<b>' + props['Name of airport'] + '</b><br />' + 'Location: ' + props.Location
            : 'Hover over an airport');

    }

}

info.addTo(map)

//QGIS2WebMap Plugin
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({ truncate: { length: 30, location: 'smart' } });
L.control.locate({ locateOptions: { maxZoom: 19 } }).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
    .innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0]
    .className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}

//Create Indian States layer
function style_INDIA_STATES_0_0() {
    return {
        pane: 'pane_INDIA_STATES_0',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(166,206,227,1.0)',
        interactive: false,
    }
}
map.createPane('pane_INDIA_STATES_0');
map.getPane('pane_INDIA_STATES_0').style.zIndex = 400;
map.getPane('pane_INDIA_STATES_0').style['mix-blend-mode'] = 'normal';
var layer_INDIA_STATES_0 = new L.geoJson(json_INDIA_STATES_0, {
    attribution: '',
    interactive: true,
    dataVar: 'json_INDIA_STATES_0',
    layerName: 'layer_INDIA_STATES_0',
    pane: 'pane_INDIA_STATES_0',
    style: style_INDIA_STATES_0_0,
});
bounds_group.addLayer(layer_INDIA_STATES_0);
map.addLayer(layer_INDIA_STATES_0);

var highlightFeature = (e) => {
    var layer = e.target

    info.update(layer.feature.properties)
}

var resetHighlight = (e) => {
    info.update()
}

//Airport pop-up
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    })
    //Pop-up content display
    var popupContent = '<table>\
            <tr>\
                <th scope="row">ICAO code&emsp;</th>\
                <td>' + (feature.properties['ICAO code'] !== null ? autolinker.link(feature.properties['ICAO code'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Name of airport&emsp;</th>\
                <td>' + (feature.properties['Name of airport'] !== null ? autolinker.link(feature.properties['Name of airport'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Observed (D/T)&emsp;</th>\
                <td>' + (feature.properties['Observed D/T'] !== null ? autolinker.link(feature.properties['Observed D/T'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Location&emsp;</th>\
                <td>' + (feature.properties['Location'] !== null ? autolinker.link(feature.properties['Location'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Pressure (hPa)&emsp;</th>\
                <td>' + (feature.properties['Pressure'] !== null ? autolinker.link(feature.properties['Pressure'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Temperature (°C)&emsp;</th>\
                <td>' + (feature.properties['Temperature'] !== null ? autolinker.link(feature.properties['Temperature'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Humidity (%)&emsp;</th>\
                <td>' + (feature.properties['Humidity'] !== null ? autolinker.link(feature.properties['Humidity'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Dewpoint (°C)&emsp;</th>\
                <td>' + (feature.properties['Dewpoint'] !== null ? autolinker.link(feature.properties['Dewpoint'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Visibility (m)&emsp;</th>\
                <td>' + (feature.properties['Visibility'] !== null ? autolinker.link(feature.properties['Visibility'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Cloud 1st Layer&emsp;</th>\
                <td>' + (feature.properties["Cloud 1st Layer"] !== null ? autolinker.link(feature.properties["Cloud 1st Layer"].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Cloud 2nd Layer&emsp;</th>\
                <td>' + (feature.properties["Cloud 2nd Layer"] !== null ? autolinker.link(feature.properties["Cloud 2nd Layer"].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Cloud 3rd Layer&emsp;</th>\
                <td>' + (feature.properties["Cloud 3rd Layer"] !== null ? autolinker.link(feature.properties["Cloud 3rd Layer"].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Wind Direction (°)&emsp;</th>\
                <td>' + (feature.properties["Wind Direction"] !== null ? autolinker.link(feature.properties["Wind Direction"].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Wind Speed (kts)&emsp;</th>\
                <td>' + (feature.properties["Wind Speed"] !== null ? autolinker.link(feature.properties["Wind Speed"].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Conditions&emsp;</th>\
                <td>' + (feature.properties['Conditions'] !== null ? autolinker.link(feature.properties['Conditions'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Flight Category&emsp;</th>\
                <td>' + (feature.properties['Flight Category'] !== null ? autolinker.link(feature.properties['Flight Category'].toLocaleString()) : 'NA') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, { maxHeight: 500, maxWidth: 500 })
}
//creating airport layer
function style_airport_1_0() {
    return {
        pane: 'pane_airport_1',
        interactive: true,

    }
}
map.createPane('pane_airport_1');
map.getPane('pane_airport_1').style.zIndex = 600;
map.getPane('pane_airport_1').style['mix-blend-mode'] = 'normal';
var airport_points = []
var layer_airport_1 = new L.geoJson(json_airport_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_airport_1',
    layerName: 'layer_airport_1',
    pane: 'pane_airport_1',
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        var point = L.marker(latlng, style_airport_1_0(feature));
        airport_points.push(point)
        return point;
    },
});
bounds_group.addLayer(layer_airport_1);
map.addLayer(layer_airport_1);

//Web-map tools
var osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
    .title += 'Search for a place';
var baseMaps = { '<img src="legend/INDIA_STATES_0.png" /> INDIA_STATES': layer_INDIA_STATES_0, };
var overlayMaps = { '<img src="legend/airport_1.png" /> airport': layer_airport_1 }

setBounds();
map.addControl(new L.Control.Search({
    layer: layer_airport_1,
    initial: false,
    hideMarkerOnCollapse: true,
    propertyName: 'iata_code'
}));
document.getElementsByClassName('search-button')[0].className +=
    ' fa fa-binoculars';