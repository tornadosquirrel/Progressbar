const getEXP = document.getElementById("getEXP");
const resetBtn = document.getElementById("resetBtn");
const sticker = document.getElementById("sticker");
const progressBar = document.getElementById("progressBar");
const levelText = document.getElementById("level");

let level = 1;
let totalExp = 0;

function Start() {
  let Exp = Math.floor(Math.random() * 10) + 1;
  Exp *= 5;
  totalExp += Exp;
  updateLevelProgressBar(level, totalExp);
};

function judgeLevel() {
  if (totalExp >= 100) {
    level++;
    totalExp -= 100;
    updateLevelProgressBar(level, totalExp);
  }
  else if (level % 5 != 0) {
    getEXP.addEventListener("click", celebration);
  }
};

function Reset() {
  level = 1;
  totalExp = 0;
  updateLevelProgressBar(level, totalExp);
};

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function celebration() {
  if (level % 5 == 0) {
    getEXP.removeEventListener("click", Start);
    let count = 0;
    let interval = setInterval(() => {
      sticker.style.visibility = "visible";
      sticker.innerHTML = `🎉축하합니다!🎉<br>🎉레벨 ${level} 달성!🎉`;
      if (level <= 40) {
        randomMoving = level * 8;
      }
      else {
        randomMoving = 320;
      }
      leftMoving = randint(-randomMoving, randomMoving);
      topMoving = randint(-randomMoving, randomMoving);
      sticker.style.transform = `translate(${leftMoving}px, ${topMoving}px)`;

      setTimeout(() => {
        sticker.style.visibility = "hidden";
      }, 25);

      count++;
      if (count >= level) {
        clearInterval(interval);
        getEXP.addEventListener("click", Start);
      }
    }, 50);
    getEXP.removeEventListener("click", celebration);
  }
}

// 프로그레스바 업데이트 함수
function updateLevelProgressBar(level, exp) {
  if (totalExp < 100) { 
    progressBar.style.width = `${exp}%`;
    levelText.textContent = `레벨 ${level} (${exp}%)`;
  }
  else{
    progressBar.style.width = `${exp-100}%`;
    levelText.textContent = `레벨 ${level} (${exp-100}%)`;
  }
};

getEXP.addEventListener("click", Start);
getEXP.addEventListener("click", judgeLevel);
getEXP.addEventListener("click", celebration);
resetBtn.addEventListener("click", Reset);