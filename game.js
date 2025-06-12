const player = document.getElementById("player");
const ai = document.getElementById("ai");

let playerX = 100;
let aiX = 300;

function updatePositions() {
  player.style.left = playerX + "px";
  ai.style.left = aiX + "px";
}

function moveLeft() {
  playerX = Math.max(0, playerX - 10);
  updatePositions();
}

function moveRight() {
  playerX = Math.min(window.innerWidth - 50, playerX + 10);
  updatePositions();
}

function showBoom(target) {
  const boom = document.createElement("div");
  boom.className = "boom";
  boom.textContent = "BOOM!";
  target.appendChild(boom);
  setTimeout(() => boom.remove(), 600);
}

function punch() {
  const rightArm = document.getElementById("playerRightArm");
  const glove = document.getElementById("glove");

  rightArm.classList.add("punching");
  glove.style.display = "block";

  if (Math.abs(playerX - aiX) < 60) {
    ai.style.filter = "brightness(150%)";
    showBoom(ai);
    setTimeout(() => (ai.style.filter = ""), 200);
  }

  setTimeout(() => {
    rightArm.classList.remove("punching");
    glove.style.display = "none";
  }, 300);
}

function sloppyAiMove() {
  const rand = Math.random();

  if (rand < 0.2) {
    aiX -= 20;
  } else if (rand < 0.4) {
    aiX += 20;
  } else if (rand < 0.6) {
    aiPunch();
  }

  aiX = Math.max(0, Math.min(window.innerWidth - 50, aiX));
  updatePositions();
  setTimeout(sloppyAiMove, 2000);
}

function aiPunch() {
  if (Math.abs(aiX - playerX) < 60) {
    player.style.filter = "brightness(150%)";
    showBoom(player);
    setTimeout(() => (player.style.filter = ""), 200);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("leftBtn").addEventListener("click", moveLeft);
  document.getElementById("rightBtn").addEventListener("click", moveRight);
  document.getElementById("punchBtn").addEventListener("click", punch);

  updatePositions();
  sloppyAiMove();
});