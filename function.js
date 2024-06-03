let m_camera;
let m_water;
let m_control;
let m_interval;

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
                name: "tile",
                servername: "XDServer3d",
            },
        },
        defaultKey: "ezbBD(h2eFCmDQFQd9QpdzDS#zJRdJDm4!Epe(a2EzcbEzb2",
    });

    setMapLayer();
    setMapClass();

    initializeCamera();
}
// 건물 레이어 등록
function setMapLayer() {
    let layer = Module.getTileLayerList().createXDServerLayer({
        url: "https://xdworld.vworld.kr",
        servername: "XDServer3d",
        name: "facility_build",
        type: 9,
        minLevel: 0,
        maxLevel: 15,
    });
    layer.simple_real3d = true;
}
// 자바 스크립트 기능 클래스 선언
function setMapClass() {
    m_camera = new webCamera(Module);
    m_water = new webWater(Module);
    m_control = new webControl(Module, "MapControl");
}
// 초기 카메라 셋팅
function initializeCamera() {
    m_camera.move(new Module.JSVector3D(129.1578304522455, 35.16486256763161, 70.0));
    m_camera.tilt = 15;
    m_camera.direction = 145;

    // 카메라 완료 이벤트 등록
    Module.canvas.addEventListener("Fire_EventFinishAutoMove", complete);
}

function complete() {
    if (m_camera.state == 0) {
        // intro
        m_camera.tilt = 5;
        m_camera.state = 1;
    }

    if (m_camera.state == 2) {
        m_camera.tilt = 30;
        m_camera.direction = 145;
    }
}

function intro() {
    m_camera.state = 0;
    m_camera.addPoint(new Module.JSVector3D(129.158964, 35.163466, 55.0));
    m_camera.addPoint(new Module.JSVector3D(129.159722, 35.162588, 50.0));
    m_camera.addPoint(new Module.JSVector3D(129.161356, 35.160662, 45.0));
    m_camera.addPoint(new Module.JSVector3D(129.162349, 35.159411, 10.0));

    m_camera.do();
}

function gameOver() {
    m_camera.state = 2;

    m_camera.tilt = 35;
    m_camera.direction = 145;
    m_camera.move(new Module.JSVector3D(129.14719783672427, 35.17605563575466, 1500.0));

    m_water.limit = 60;
    m_water._flood_step = 2;

    m_water.show(true);

    m_interval = null;
    m_interval = setInterval(gameOverWater, 100);

    /*
    timer = setInterval(() => {
        if (m_water.up() == false) {
            m_control.drawGameOver();
            clearInterval();
        }
    }, 100);
    */
}

function gameOverWater() {
    if (m_water.up() == false) {
        m_control.drawGameOver();
        clearInterval(m_interval);
    }
}

function water_up() {
    m_water.up();
}

function water_down() {
    m_water.down();
}

function ui_clear() {
    m_control.clear();
}

function ui_hp() {
    m_control.drawHPBar();
}

function ui_up() {
    m_control.currenWater += 10;
    m_control.drawHPBar();
}

function ui_down() {
    m_control.currenWater -= 10;
    m_control.drawHPBar();
}

function ui_arc() {
    m_control.test();
}
