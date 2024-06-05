// script.js

const gaugeContainer = document.getElementById('gauge-container');
const gauge = document.getElementById('gauge');
let increasing = true;
let width = 0;
let animationFrameId;
let isPaused = false;

function animateGauge() {
    if (!isPaused) {
        if (increasing) {
            width += 1;
            if (width >= 100) {
                increasing = false;
            }
        } else {
            width -= 1;
            if (width <= 0) {
                increasing = true;
            }
        }
        gauge.style.width = width + '%';
    }
    animationFrameId = requestAnimationFrame(animateGauge);
}

gaugeContainer.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        animateGauge(); // 애니메이션 재개
    } else {
        isPaused = true;
        cancelAnimationFrame(animationFrameId); // 애니메이션 중단
    }
});

animateGauge();
