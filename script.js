document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) tg.expand();

  let spinning = false;
  let currentRotation = 0;

  const wheel = document.getElementById("wheel");
  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const buttonsDiv = document.querySelector(".buttons");

  window.spin = function(color) {
    if (spinning) return;
    spinning = true;

    // скрываем экран результата, если был
    resultScreen.style.display = "none";

    // случайный угол
    const rotation = currentRotation + 360 * 5 + Math.floor(Math.random() * 360);
    currentRotation = rotation;

    wheel.style.transform = rotate(${rotation}deg);

    setTimeout(() => {
      const win = Math.random() < 0.5;

      // показываем результат
      resultText.textContent = win ? "WIN 💰" : "LOSE ❌";
      resultText.className = win ? "win" : "lose";
      resultScreen.style.display = "block";

      // можно отправлять данные в Telegram
      if (tg) {
        tg.sendData(JSON.stringify({
          game: "roulette",
          color: color,
          win: win
        }));
      }

      spinning = false;
    }, 2800);
  };

  window.resetGame = function() {
    resultScreen.style.display = "none";
  };
});