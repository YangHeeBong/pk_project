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