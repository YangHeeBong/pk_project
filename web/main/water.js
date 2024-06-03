class webWater {
    m_map = null;
    m_flood = null;

    _height = 0.0;
    _limit_height = 3.0;
    _flood_step = 0.0;

    constructor(_map) {
        console.log("create webWater");

        this.m_map = _map;
        this.m_flood = this.m_map.getFlood();

        this._height = 0.0;
        this._limit_height = 3.0;
        this._flood_step = 0.2;
    }
    show(_is_visible) {
        Module.getFlood().active(_is_visible);
    }
    up() {
        this._height += this._flood_step;

        if (this._height > this._flood_step) this.show(true);
        if (this._height > this._limit_height) {
            this._height = this._limit_height;
            return false;
        }

        Module.getFlood().setHeight(this._height);
        return true;
    }
    down() {
        this._height -= this._flood_step;
        if (this._height < this._flood_step) {
            this.show(false);
            this._height = 0;
        }

        Module.getFlood().setHeight(this._height);
    }

    // getter/setter
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
