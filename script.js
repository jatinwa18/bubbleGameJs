let timer = 60;
let score = 0;
let hitNumber = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highscore").textContent = highScore;

function generateBubbles() {
    let bubbles = "";
    for (let i = 1; i <= 100; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        bubbles += `<div class="bubble">${randomNum}</div>`;
    }
    document.querySelector("#bubblearea").innerHTML = bubbles;
}

function startTimer() {
    let countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerval").textContent = timer;
        } else {
            document.querySelector("#bubblearea").innerHTML = `<h1>Game Over! 🎮</h1>`;
            document.getElementById("restartBtn").style.display = "block";
            clearInterval(countdown);

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", highScore);
                document.getElementById("highscore").textContent = highScore;
            }
        }
    }, 1000);
}

function generateHitNumber() {
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector("#hitint").textContent = hitNumber;
}

function updateScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#bubblearea").addEventListener("click", (event) => {
    if (event.target.classList.contains("bubble")) {
        let clickedNum = Number(event.target.textContent);
        if (clickedNum === hitNumber) {
            updateScore();
            generateHitNumber();
            generateBubbles();
        }
    }
});

document.getElementById("restartBtn").addEventListener("click", () => {
    timer = 60;
    score = 0;
    document.querySelector("#scoreval").textContent = "00";
    document.querySelector("#timerval").textContent = timer;
    document.getElementById("restartBtn").style.display = "none";
    generateHitNumber();
    generateBubbles();
    startTimer();
});

generateHitNumber();
generateBubbles();
startTimer();




