let m_camera;
let m_water;

function start() {
    let map = document.querySelector("#MapContianer");
    Module.initialize({
        container: map,
        terrain: {
            dem: {
                url: "https://xdworld.vworld.kr",
                name: "dem",
                servername: "XDServer3d",
                encoding: true,
            },
            image: {
                url: "https://xdworld.vworld.kr",
                name: "tile_mo_HD",
                servername: "XDServer3d",
            },
        },
        defaultKey: "ezbBD(h2eFCmDQFQd9QpdzDS#zJRdJDm4!Epe(a2EzcbEzb2",
    });



    m_camera = new webCamera();
    m_water = new webWater();



    /*
    var start = new Module.JSVector3D(
        127.94080035885989,
        36.336424549396064,
        306.52637346833944
    );
    var end = new Module.JSVector3D(
        127.9419239501012,
        36.33615414434727,
        300.5711971661076
    );

    let parameters = {
        start: start,
        end: end,
        detail: 100, // Number of interpolation points on the curve (higher values make the curve closer to the actual path)
        height: start.Altitude + 20.0, // Maximum height of the curve (elevation in meters)
        percent: 100, // Position of the highest point on the curve between the start and end points
    };

    let curve = Module.getMath().convertBeZierLine(parameters);
    let curvecount = curve.return.count();

    var vertices = [];
    for (var j = 0; j < curvecount; j++) {
        var pos = curve.return.get(j);
        vertices.push([pos.Longitude, pos.Latitude, pos.Altitude]);
    }
    var line = Module.createLineString("WIND_PATH");

    let error = line.createbyJson({
        coordinates: {
            coordinate: vertices, // Array of vertices
            style: "XYZ",
        },
        color: new Module.JSColor(255, 0, 0), // ARGB
        width: 1.2, // Line width
        type: 5, // Representation method
        speed: 0.05, // Speed setting
        skip: 4,
    });

    // Add object to layer
    let layerList = new Module.JSLayerList(true);
    let layer = layerList.createLayer("WIND_PATH_LAYER", Module.ELT_3DLINE);
    layer.setMaxDistance(10000000);
    layer.addObject(line, 0);
    */
}

/*
setMapOption();
setMapLayer();
function setMapOption() {
    // 카메라 위치
    Module.getViewCamera().setLocation(new Module.JSVector3D(129.1031735, 35.134032, 1000.0));
}

function setMapLayer() {
    // 기본 건물 레이어
    let layer = Module.getTileLayerList().createXDServerLayer({
        url: "https://xdworld.vworld.kr",
        servername: "XDServer3d",
        name: "facility_build",
        type: 9,
        minLevel: 0,
        maxLevel: 15,
    });

    layer.tile_load_ratio = 3.0;
    layer.simple_real3d = true;
}
*/