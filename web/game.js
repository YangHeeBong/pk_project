class webFishGame {
    m_map = null;
    m_canvas = null;
    m_context = null;
    m_fish_image = null;
    m_hook_image = null;
    m_3ds_sphere = null;

    _in_game = false;

    _callback_click = null;

    constructor(_map, _name) {
        this.m_map = _map;
        this.m_canvas = document.getElementById(_name);
        this.m_context = this.m_canvas.getContext("2d");

        this.m_3ds_sphere = null;

        this._callback_click = null;

        this.loadData();
        this.loadImage();
    }

    clear() {
        this.m_context.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
    }

    loadData() {
        Module.getGhostSymbolMap().insert({
            id: "cylinder",
            url: "./data/half_sphere.3ds",
            callback: this.callback3DS
        });

    }

    loadImage() {
        this.m_fish_image = new Image();
        this.m_hook_image = new Image();

        this.m_fish_image.src = "./data/fish.png";
        this.m_hook_image.src = "./data/hook.png";
    }

    draw() {
        if (this._in_game == false) return;
        this.clear();

        this.m_context.font = "30px Arial";
        this.m_context.fillStyle = "black";
        this.m_context.fillText("Test Fish", 10, 50);

        this.m_context.drawImage(this.m_fish_image, canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
        this.m_context.drawImage(this.m_hook_image, canvas.width / 2 - 15, canvas.height / 2 + 50, 30, 30);
    }

    callback3DS(_e) {

        let layer = Module.getObjectLayerList().createObjectLayer({
            name: "FISH_LAYER",
            type: Module.ELT_GHOST_3DSYMBOL,
            maxDistance: 10000000
        });

        Module.getGhostSymbolMap().setModelFaceReflect(_e.id, 0, 0.5);

        m_game.m_3ds_sphere = Module.createGhostSymbol("HALF_SPHERE_" + i);
        m_game.m_3ds_sphere.setBasePoint(0, 0, 0);
        m_game.m_3ds_sphere.setGhostSymbol(_e.id);
        m_game.m_3ds_sphere.setPosition(new Module.JSVector3D(0, 0, 0.0));
        m_game.m_3ds_sphere.setScale(new Module.JSSize3D(10, 10, 10));
        m_game.m_3ds_sphere.color = new Module.JSColor(255, 0, 0);
        m_game.m_3ds_sphere.opacity = 0.6;

        // Add to layer
        layer.addObject(m_game.m_3ds_sphere, 0);
    }

    eventClick(e) {
        let position = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.layerX, e.layerY));

        if (position == null) return;
        if (position.altitude > 0.2) return;

        position.altitude += 5;
        m_game.m_3ds_sphere.setPosition(position);
    }

    // getter/setter
    get game() {
        return this._in_game;
    }

    set game(_is_game) {
        this._in_game = _is_game;

        if (this._in_game == true) {
            this.m_canvas.addEventListener("click", this.eventClick);
        } else {
            this.m_canvas.removeEventListener("click", this.eventClick);
            this.clear();
        }
    }
}
