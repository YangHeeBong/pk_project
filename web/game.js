class webFishGame {
    m_canvas = null;
    m_context = null;
    m_fish_image = null;
    m_hook_image = null;

    _in_game = false;

    _callback_click = null;

    constructor(_name) {
        this.m_canvas = document.getElementById(_name);
        this.m_context = this.m_canvas.getContext("2d");

        this.loadImage();

        this._callback_click = null;
    }

    clear() {
        this.m_context.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
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

    eventClick() {
        console.log("click");
        this.draw();
        /*
        if (!fishing) {
            fishing = true;
            message = "Fishing...";
            setTimeout(() => {
                fishCaught = Math.random() > 0.5; // 50% 확률로 물고기 잡기
                if (fishCaught) {
                    score++;
                    message = "You caught a fish! Score: " + score;
                } else {
                    message = "No fish caught. Try again!";
                }
                fishing = false;
                draw();
            }, 2000); // 2초 후 결과 확인
            draw();
        }
        */
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
        }
    }
}
