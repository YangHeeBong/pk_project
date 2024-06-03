class webControl {
    m_map = null;
    m_canvas = null;
    m_context = null;

    currenWater = 0;

    constructor(_map, _name) {
        this.m_map = _map;

        this.m_canvas = document.getElementById(_name);
        this.m_canvas.width = this.m_map.canvas.width;
        this.m_canvas.height = this.m_map.canvas.height;

        this.m_context = this.m_canvas.getContext("2d");

        console.log("create webControl");
    }

    clear() {
        this.m_context.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
    }

    drawGameOver() {
        console.log("game over");
        this.clear();

        this.m_context.font = "72px serif";
        this.m_context.textAlign = "center";
        this.m_context.fillStyle = "rgba(255, 255, 255, 1.0)";
        this.m_context.fillText("GAME OVER", this.m_map.canvas.width * 0.5, this.m_map.canvas.height * 0.5);
    }
    drawHPBar() {
        this.clear();
        var hp_height = (this.currenWater / 100.0) * 300.0;

        // 바탕
        this.m_context.fillStyle = "rgba(128, 128, 128, 1.0)";
        this.m_context.fillRect(this.m_map.canvas.width - 50, this.m_map.canvas.height * 0.5, 30, 300);
        // 태두리
        this.m_context.strokeStyle = "rgba(0, 0, 0, 1.0)";
        this.m_context.lineWidth = 2;
        this.m_context.strokeRect(this.m_map.canvas.width - 50, this.m_map.canvas.height * 0.5, 30, 300);
        // 실 데이터
        this.m_context.fillStyle = "rgba(0, 105, 148, 1.0)";
        this.m_context.fillRect(this.m_map.canvas.width - 50, this.m_map.canvas.height * 0.5 + (300 - hp_height), 30, hp_height);
    }
    // getter/setter
    get currenWater() {
        return this.currenWater;
    }

    set currenWater(_water_level) {
        this.currenWater = _water_level;
    }
}
