document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.getElementById("wheel");
  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  let spinning = false;
  let betColor = null;

  function spinWheel() {
    const randomDegree = Math.floor(Math.random() * 360);
    wheel.style.transform = rotate(${randomDegree + 1440}deg); // 4 полных оборота + случайный угол

    // Определяем цвет победителя
    setTimeout(() => {
      spinning = false;
      const normalized = randomDegree % 360;
      const winningColor = (normalized >= 0 && normalized < 45) ||
                           (normalized >= 90 && normalized < 135) ||
                           (normalized >= 180 && normalized < 225) ||
                           (normalized >= 270 && normalized < 315) ? 'red' : 'black';

      if (!betColor) {
        resultText.textContent = Выпал ${winningColor.toUpperCase()};
      } else if (betColor === winningColor) {
        resultText.textContent = Выпал ${winningColor.toUpperCase()}! WIN 💰;
        resultText.className = 'win';
      } else {
        resultText.textContent = Выпал ${winningColor.toUpperCase()}! LOSE ❌;
        resultText.className = 'lose';
      }

      resultScreen.style.display = 'block';
    }, 4200); // совпадает с transition 4s
  }

  function resetWheel() {
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    void wheel.offsetWidth; // перезапуск transition
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    spinning = false;
    betColor = null;
  }

  document.getElementById("btn-red").addEventListener("click", () => {
    if (spinning) return;
    betColor = 'red';
    spinning = true;
    resultScreen.style.display = 'none';
    spinWheel();
  });

  document.getElementById("btn-black").addEventListener("click", () => {
    if (spinning) return;
    betColor = 'black';
    spinning = true;
    resultScreen.style.display = 'none';
    spinWheel();
  });

  document.getElementById("play-again").addEventListener("click", () => {
    resultScreen.style.display = 'none';
    resetWheel();
  });
});