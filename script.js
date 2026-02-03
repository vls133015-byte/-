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

  // сектора: по порядку как в CSS
  const sectors = [
    "red", "black", "red", "black",
    "red", "black", "red", "black"
  ];
  const sectorAngle = 360 / sectors.length;

  window.setBet = function(amount) {
    currentBet = amount;
    betValue.textContent = amount;
  };

  window.spin = function(chosenColor) {
    if (spinning) return;
    spinning = true;

    resultScreen.style.display = "none";

    const extraSpins = 360 * 5;
    const randomAngle = Math.floor(Math.random() * 360);
    const rotation = currentRotation + extraSpins + randomAngle;
    currentRotation = rotation;

    wheel.style.transform = rotate(${rotation}deg);

    setTimeout(() => {
      // вычисляем сектор под стрелкой
      const normalizedAngle = (360 - (rotation % 360)) % 360;
      const sectorIndex = Math.floor(normalizedAngle / sectorAngle);
      const resultColor = sectors[sectorIndex];

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
    }, 2800);
  };

  window.resetGame = function() {
    resultScreen.style.display = "none";
  };
});