// game.js
const canvas = document.getElementById("MapControl");
const ctx = canvas.getContext("2d");

const fishImage = new Image();
fishImage.src = "./data/fish.png"; // 물고기 이미지 경로 설정

const hookImage = new Image();
hookImage.src = "./data/hook.png"; // 낚시 바늘 이미지 경로 설정

let score = 0;
let fishing = false;
let fishCaught = false;
let message = "Click to cast your line";

canvas.addEventListener("click", () => {
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
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(message, 10, 50);
    if (fishCaught) {
        ctx.drawImage(fishImage, canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
    }
    if (fishing) {
        ctx.drawImage(hookImage, canvas.width / 2 - 15, canvas.height / 2 + 50, 30, 30);
    }
}

fishImage.onload = function () {
    console.log("onload");
    hookImage.onload = function () {
        draw();
    };
};
