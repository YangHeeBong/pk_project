class webFishGame {
    // 낚시 표현 변수
    m_map = null;
    m_canvas = null;
    m_context = null;

    m_3ds_sphere = null;

    // 게이지 관련 변수
    m_gauge_container = null;
    m_gauge = null;
    m_target_box = null;

    m_state = 0;
    m_container_width = 0;
    m_target_width = 0;
    m_increasing = true;
    m_gauge_width = 0;
    m_gauge_frame = null;
    m_is_pause = false;
    m_target_position = 0;
    m_score = 0;

    // 이미지
    m_img_fishingrod = null;
    m_img_success = null;
    m_img_failure = null;

    // 외부 입력 변수
    _in_game = false;
    _life = 0;

    constructor(_map, _name) {
        this.m_map = _map;
        this.m_canvas = document.getElementById(_name);
        this.m_context = this.m_canvas.getContext("2d");

        this.m_3ds_sphere = null;

        this.m_state = 0;
        this.m_increasing = true;
        this.m_gauge_width = 0;
        this.m_gauge_frame = null;
        this.m_is_pause = false;
        this.m_target_position = 0;
        this.m_score = 0;

        this.loadData();
        this.loadElement();
        this.loadImage();
    }

    clear() {
        this.m_context.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
    }

    initialize() {
        this.clear();
        this.m_state = 0;
        this.m_is_pause = false;
        this.m_gauge_frame = 0;
        this.m_gauge_container.style.visibility = "hidden";
        this.m_3ds_sphere.setPosition(new Module.JSVector3D(0, 0, 0));
    }

    loadData() {
        Module.getGhostSymbolMap().insert({
            id: "cylinder",
            url: "./data/half_sphere.3ds",
            callback: this.callback3DS,
        });
    }

    loadElement() {
        this.m_gauge_container = document.getElementById("gauge-container");
        this.m_gauge = document.getElementById("gauge");
        this.m_target_box = document.getElementById("target-box");

        this.m_container_width = this.m_gauge_container.clientWidth;
        this.m_target_width = this.m_target_box.clientWidth;
    }

    loadImage() {
        this.m_img_fishingrod = new Image();
        this.m_img_success = new Image();
        this.m_img_failure = new Image();

        this.m_img_fishingrod.src = "./data/fishrod.png";
        this.m_img_success.src = "./data/success.webp";
        this.m_img_failure.src = "./data/failure.webp";
    }

    draw(_type) {
        this.clear();

        let w = 0;
        for (let i = 0; i < this._life; i++) {
            w = i * 64;
            this.m_context.drawImage(this.m_img_fishingrod, w + 10, 10, 64, 64);
        }

        let score = "잡은 물고기 수: " + this.m_score;
        this.m_context.font = "24px Arial";
        this.m_context.fillStyle = "rgba(255, 255, 255, 1.0)";
        this.m_context.textAlign = "center";
        this.m_context.fillText(score, canvas.width - 120, 50);

        this.m_context.fillText("STAGE 1", 70, canvas.height - 50);

        if (_type == 1) this.m_context.drawImage(this.m_img_success, canvas.width / 2 - 256, canvas.height / 2 - 256, 512, 512);
        else if (_type == 2) this.m_context.drawImage(this.m_img_failure, canvas.width / 2 - 256, canvas.height / 2 - 256, 512, 512);
    }

    stageEnd() {
        this.initialize();
        m_game.life = 3;
        m_game.game = false;

        this.m_context.font = "72px serif";
        this.m_context.textAlign = "center";
        this.m_context.fillStyle = "rgba(255, 255, 255, 1.0)";
        this.m_context.fillText("STAGE CLEAR", this.m_map.canvas.width * 0.5, this.m_map.canvas.height * 0.5);

        this.m_context.font = "40px serif";
        this.m_context.fillStyle = "rgba(255, 255, 255, 1.0)";
        let score = "Score:" + this.m_score * 100;
        this.m_context.fillText(score, this.m_map.canvas.width * 0.5, this.m_map.canvas.height * 0.5 + 70);

        this.m_canvas.removeEventListener("click", this.eventClick);
        this.m_gauge_container.removeEventListener("click", this.eventGaugeClick);
        cancelAnimationFrame(this.m_gauge_frame);
    }

    startGauge() {
        this.m_gauge_container.removeEventListener("click", this.eventGaugeClick);
        this.m_gauge_container.addEventListener("click", this.eventGaugeClick);
        this.m_gauge_container.style.visibility = "visible";

        this.m_gauge_container.style.left = this.m_canvas.width * 0.5 - 200 + "px";
        this.m_gauge_container.style.top = this.m_canvas.height - 80 + "px";
        this.m_target_box.style.left = `${this.eventRandom()}px`;
        this.eventAnimateGauge();
    }

    callback3DS(_e) {
        let layer = Module.getObjectLayerList().createObjectLayer({
            name: "FISH_LAYER",
            type: Module.ELT_GHOST_3DSYMBOL,
            maxDistance: 10000000,
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
    eventRandom() {
        return Math.random() * (m_game.m_container_width - m_game.m_target_width);
    }
    eventAnimateGauge() {
        if (m_game.m_is_pause == false) {
            if (m_game.m_increasing == true) {
                m_game.m_gauge_width += 2;
                if (m_game.m_gauge_width >= 100) {
                    m_game.m_increasing = false;
                }
            } else {
                m_game.m_gauge_width -= 2;
                if (m_game.m_gauge_width <= 0) {
                    m_game.m_increasing = true;
                }
            }
            m_game.m_gauge.style.width = m_game.m_gauge_width + "%";
        }
        cancelAnimationFrame(m_game.m_gauge_frame);
        m_game.m_gauge_frame = requestAnimationFrame(m_game.eventAnimateGauge);
    }

    eventGaugeClick() {
        if (m_game.m_state != 1) return;

        m_game.draw(0);

        if (m_game.m_is_pause == true) {
            m_game.m_is_pause = false;
            m_game.m_target_box.style.left = `${m_game.eventRandom()}px`;
            cancelAnimationFrame(m_game.m_gauge_frame); // 애니메이션 중단
            m_game.eventAnimateGauge();
        } else {
            m_game.m_is_pause = true;
            cancelAnimationFrame(m_game.m_gauge_frame); // 애니메이션 중단

            let min, max, str;

            str = m_game.m_target_box.style.left;
            str = str.replace("px", "");

            min = max = Math.round(str * 1);
            min -= m_game.m_target_width * 0.5;
            max += m_game.m_target_width * 0.5;

            min = (min / 400) * 100;
            max = (max / 400) * 100;

            if (min <= m_game.m_gauge_width && max >= m_game.m_gauge_width) {
                m_game.draw(1);
                m_game.m_score += 1;
            } else {
                m_game.draw(2);
            }
            m_game.m_state = 2;
            m_game.life -= 1;

            if (m_game.life == 0) m_game.stageEnd();
        }
    }

    eventClick(e) {
        if (m_game.m_state == 0) {
            let position = Module.getMap().ScreenToMapPointEX(new Module.JSVector2D(e.layerX, e.layerY));

            if (position == null) return;
            if (position.altitude > 0.2) return;

            position.altitude += 5;
            m_game.m_3ds_sphere.setPosition(position);
            m_game.m_state = 1;
            m_game.startGauge();
        } else if (m_game.m_state == 1) {
        } else {
            m_game.initialize();
            m_game.draw(0);
            m_game.m_state = 0;
        }
    }

    // getter/setter

    get life() {
        return this._life;
    }
    set life(_life) {
        this._life = _life;
    }

    get game() {
        return this._in_game;
    }

    set game(_is_game) {
        if (this._in_game != _is_game) {
            this._in_game = _is_game;
            this.initialize();

            this.m_canvas.removeEventListener("click", this.eventClick);
            this.m_gauge_container.removeEventListener("click", this.eventGaugeClick);
            cancelAnimationFrame(this.m_gauge_frame);
        }

        if (this._in_game == true) {
            if (this.m_state == 0) {
                this.m_score = 0;
                this.m_canvas.removeEventListener("click", this.eventClick);
                this.m_canvas.addEventListener("click", this.eventClick);
            }
            this.draw(0);
        } else {
            this.initialize();
        }
    }
}
