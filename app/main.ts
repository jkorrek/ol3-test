import 'openlayers';
import 'font-awesome/css/font-awesome.css';

function faUnicode(name) {
    // Create a holding element (they tend to use <i>, so let's do that)
    const testI = document.createElement('i');
    // Create a realistic classname
    // - maybe one day it will need both, so let's add them
    if (name.indexOf('fa fa-') === 0) {
        testI.className = name;

    } else if (name.indexOf('fa-') === 0) {
        testI.className = `fa ${name}`;

    } else {
        testI.className = `fa fa-${name}`;
    }
    // We need to append it to the body for it to have
    //   its pseudo element created
    document.body.appendChild(testI);

    // Get the computed style
    const char = window.getComputedStyle(
        testI, ':before' // Add the ':before' to get the pseudo element
    ).content.replace(/'|"/g, ''); // content wraps things in quotes
    //   which we don't want
    // Remove the test element
    testI.remove();

    return char;
}


class IconLayer extends ol.layer.Vector {
    constructor(opt_options?: olx.layer.VectorOptions) {
        opt_options.style = [
            new ol.style.Style({
                text: new ol.style.Text({
                    text: faUnicode('fa fa-bath'), font: '18px FontAwesome',
                    fill: new ol.style.Stroke({ color: 'red' })
                }),
            }),
            new ol.style.Style({
                text: new ol.style.Text({ text: 'def', offsetY: 20 })
            })];

        super(opt_options);
    }
}

class RadiusLayer extends ol.layer.Vector {

    constructor(opt_options?: olx.layer.VectorOptions) {
        opt_options.style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 3,
                color: 'purple'
            })
        });

        super(opt_options);

    }
}

var pointFeature = new ol.Feature(new ol.geom.Point([0, 0]));

var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileJSON({
                url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure'
            })
        }),
        new IconLayer({
            source: new ol.source.Vector({
                features: [pointFeature]
            })
        }),
        new RadiusLayer({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature(ol.geom.Polygon.circular(new ol.Sphere(6378137), [0, 0], 500000, 200).transform('EPSG:4326', 'EPSG:3857'))
                ]
            })
        })
    ],
    target: 'map',
    view: new ol.View({
        center: [0, 0],
        zoom: 2
    })
});
