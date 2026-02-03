document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) tg.expand();

  let spinning = false;
  let currentRotation = 0;
  let currentBet = 10;

  const wheel = document.getElementById("wheel");
  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const betValue = document.getElementById("bet-value");

  const btnRed = document.getElementById("btn-red");
  const btnBlack = document.getElementById("btn-black");

  const betButtons = document.querySelectorAll(".bet-panel button");

  // порядок секторов как в CSS
  const sectors = ["red","black","red","black","red","black","red","black"];
  const sectorAngle = 360 / sectors.length;

  // выбор ставки
  betButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentBet = Number(btn.textContent);
      betValue.textContent = currentBet;
    });
  });

  btnRed.addEventListener("click", () => spin("red"));
  btnBlack.addEventListener("click", () => spin("black"));

  function spin(chosenColor) {
    if (spinning) return;
    spinning = true;

    resultScreen.style.display = "none";

    const rotation =
      currentRotation + 360 * 5 + Math.floor(Math.random() * 360);

    currentRotation = rotation;
    wheel.style.transform = rotate(${rotation}deg);

    setTimeout(() => {
      const normalized = (360 - (rotation % 360)) % 360;
      const index = Math.floor(normalized / sectorAngle);
      const resultColor = sectors[index];

      const win = resultColor === chosenColor;

      resultText.textContent = win ? "WIN 💰" : "LOSE ❌";
      resultText.className = win ? "win" : "lose";
      resultScreen.style.display = "block";

      if (tg) {
        tg.sendData(JSON.stringify({
          game: "roulette",
          bet: currentBet,
          chosenColor,
          resultColor,
          win
        }));
      }

      spinning = false;
    }, 4000);
  }

  document.getElementById("play-again")
    .addEventListener("click", () => {
      resultScreen.style.display = "none";
    });
});