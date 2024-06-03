class webCamera {
    m_map = null;
    m_camera = null;
    m_camera_point = [];
    _state = 0; // 상태 (0:인트로, 1:게임중, 2:게임over)
    _tilt = 0.0; // 카메라 상하회전
    _direction = 0.0; // 카메라 좌우 회전

    constructor(_map) {
        this.m_map = _map;
        this.m_camera = this.m_map.getViewCamera();

        this._state = 0;
        this._tilt = 0.0;
        this._direction = 0.0;
    }
    addPoint(_position) {
        //this.m_camera_point = new Array();
        this.m_camera_point.push(_position);
    }
    do() {
        if (this.m_camera_point.length <= 0) {
            console.error("error input position size[" + this.m_camera_point.length + "]");
            return;
        }
        let path = new this.m_map.JSVec3Array();

        // 경로 등록
        for (let item of this.m_camera_point) path.push(item);

        this.m_camera.setAutoMovePosition(path); // 경로 전달

        this.m_camera.setAnimationSpeed(3); // 카메라 이동 속도
        this.m_camera.setAutoMoveWaitFrame(5); // 카메라 이동 량 설정

        this.m_camera.startAutoMove(); // 카메라 이동 실행
        this.m_map.XDRenderData();

        // 변수 초기화
        this.m_camera_point = null;
        this.m_camera_point = [];
    }

    move(_position) {
        this.m_camera.setLocation(_position);
    }

    // getter/setter
    get state() {
        return this._state;
    }

    set state(_state) {
        this._state = _state;
    }

    get tilt() {
        this._tilt = this.m_camera.getTilt();
        return this._tilt;
    }

    set tilt(_tilt) {
        this._tilt = _tilt;
        this.m_camera.setTilt(this._tilt);
    }

    get direction() {
        this._direction = this.m_camera.getDirect();
        return this._direction;
    }

    set direction(_direction) {
        this._direction = _direction;
        this.m_camera.setDirect(this._direction);
    }
}
