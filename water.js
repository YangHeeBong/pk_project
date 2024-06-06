class webWater {
    m_map = null;
    m_flood = null;

    _is_visible = false;
    _height = 0.0;
    _limit_height = 3.0;
    _flood_step = 0.2;

    constructor(_map) {
        this.m_map = _map;
        this.m_flood = this.m_map.getFlood();

        this._height = 0.0;
        this._limit_height = 3.0;
        this._flood_step = 0.2;
    }
    set(_height) {
        this._height = _height;

        if (this._height > this._limit_height) this._height = this._limit_height;
        if (this._height < this._flood_step) this._height = 0;
        this.m_flood.setHeight(this._height);
    }
    setColor(_color) {
        console.log(_color);
        this.m_flood.setColor(_color);
    }

    checkColor(_is_color) {
        let color;
        if (_is_color <= 0.6) color = new Module.JSColor(255, 70, 130, 180);
        else if (_is_color <= 1.2) color = new Module.JSColor(255, 70, 130, 180);
        else if (_is_color <= 1.8) color = new Module.JSColor(255, 64, 224, 208);
        else if (_is_color <= 2.4) color = new Module.JSColor(255, 139, 69, 19);
        else color = new Module.JSColor(255, 165, 42, 42);
        return color;
    }

    // getter/setter
    get visible() {
        return this._is_visible;
    }

    set visible(_is_visible) {
        this._is_visible = _is_visible;
        this.m_flood.active(this._is_visible);
    }
    get height() {
        return this._height;
    }

    set height(_height) {
        this._height = _height;
    }

    get limit() {
        return this._limit_height;
    }

    set limit(_limit_height) {
        this._limit_height = _limit_height;
    }

    get step() {
        return this._flood_step;
    }

    set step(_step) {
        this._flood_step = _step;
    }
}
