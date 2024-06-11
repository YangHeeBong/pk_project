let m_camera;
let m_water;
let m_control;
let m_game;
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

    reset();
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
    layer.tileLoadRatio = 3.0;
    layer.simple_real3d = true;
}

/**
 * 초기화 관련 이벤트 처리
 */
function setMapClass() {
    // 자바 스크립트 기능 클래스 선언
    m_camera = new webCamera(Module);
    m_water = new webWater(Module);
    m_control = new webControl(Module, "MapControl");
    m_game = new webFishGame(Module, "MapControl");
}

function initializeCamera() {
    // 초기 카메라 설정
    m_camera.move(new Module.JSVector3D(129.1578304522455, 35.16486256763161, 70.0));

    m_camera.state = 0;
    m_camera.tilt = 15;
    m_camera.direction = 145;

    // 카메라 완료 이벤트 등록
    Module.canvas.addEventListener("Fire_EventFinishAutoMove", complete);
}

function initializeWater() {
    // 초기 물판 설정
    m_water.height = 0.0;
    m_water.limit = 3.0;
    m_water.step = 0.2;

    m_water.visible = false;
    m_water.set(m_water.height);
}
function initializeControl() {
    m_control.currenWater = 0;
    m_control.clear();
}

// 내부 이벤트
function complete() {
    if (m_camera.state == 0) {
        // intro
        // 카메라 설정
        m_camera.tilt = 5;
        m_camera.state = 1;
        // 게이지 설정
        m_control.drawHPBar();
    }

    if (m_camera.state == 2) {
        m_camera.tilt = 30;
        m_camera.direction = 145;
    }
}

function gameOverWater() {
    m_water.height += m_water.step;

    if (m_water.height >= m_water.limit) {
        m_control.drawGameOver();
        clearInterval(m_interval);
    }
    m_water.set(m_water.height);
}

// UI 이벤트
function reset() {
    initializeCamera();
    initializeWater();
    initializeControl();

    if (m_interval != null) clearInterval(m_interval);
}

function intro() {
    reset();

    m_camera.addPoint(new Module.JSVector3D(129.158964, 35.163466, 55.0));
    m_camera.addPoint(new Module.JSVector3D(129.159722, 35.162588, 50.0));
    m_camera.addPoint(new Module.JSVector3D(129.161356, 35.160662, 45.0));
    m_camera.addPoint(new Module.JSVector3D(129.162349, 35.159411, 10.0));
    m_camera.do();
}

function gameOver() {
    m_water.visible = true;

    m_camera.state = 2;
    m_camera.tilt = 35;
    m_camera.direction = 145;
    m_camera.move(new Module.JSVector3D(129.14719783672427, 35.17605563575466, 1500.0));

    m_water.height = 0;
    m_water.limit = 10;
    m_water.step = 0.4;

    m_control.clear();

    m_interval = null;
    m_interval = setInterval(gameOverWater, 100);
}

function water_up() {
    // 물판 설정
    if (m_camera.state == 2) return false;
    if (m_water.height >= m_water.limit) {
        if (m_camera.state < 2) {
            m_water.setColor(m_water.checkColor(0));
            gameOver();
            return false;
        }
        m_camera.state = 2;
        return false;
    }
    if (m_water.visible == false) m_water.visible = true;

    let color;

    m_water.height += m_water.step;
    color = m_water.checkColor(m_water.height);
    m_water.setColor(color);
    m_water.set(m_water.height);

    // 게이지 설정
    m_control.currenWater += 10;
    m_control.drawHPBar(color.r, color.g, color.b);
    return true;
}

function water_down() {
    if (m_water.height <= 0) {
        m_water.visible = false;
        return;
    }

    if (m_water.visible == false) m_water.visible = true;

    let color;

    m_water.height -= m_water.step;
    color = m_water.checkColor(m_water.height);
    m_water.setColor(color);
    m_water.set(m_water.height);

    // 게이지 설정
    m_control.currenWater -= 10;
    m_control.drawHPBar(color.r, color.g, color.b);
}

function game_on() {
    m_game.game = true;
}
function game_off() {
    m_game.game = false;
}
