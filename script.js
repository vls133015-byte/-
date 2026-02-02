document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  } else {
    console.warn("Это не Telegram Web App");
  }

  let spinning = false;
  let currentRotation = 0;

  const wheel = document.getElementById("wheel");
  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  const buttonsDiv = document.querySelector(".buttons");

  // Функция запуска спина
  window.spin = function(color) {
    if (spinning) return;
    spinning = true;

    // Скрываем результат
    resultScreen.style.display = "none";

    // Количество полных оборотов + случайный угол (от 0 до 360)
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5–7 оборотов
    const randomAngle = Math.floor(Math.random() * 360);
    const finalRotation = currentRotation + (extraSpins * 360) + randomAngle;

    currentRotation = finalRotation;

    // Запускаем анимацию
    wheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"; // плавное замедление
    wheel.style.transform = rotate(${finalRotation}deg);

    // Через время анимации показываем результат
    setTimeout(() => {
      // Определяем, на какой сектор остановилось (примерно)
      // 360° / 8 секторов = 45° на сектор
      const normalizedAngle = finalRotation % 360;
      const sector = Math.floor(normalizedAngle / 45);

      // Пример: чётные сектора — красный, нечётные — чёрный (можно поменять)
      const isRed = sector % 2 === 0;
      const win = (color === 'red' && isRed) || (color === 'black' && !isRed);

      // Показываем результат
      resultText.textContent = win ? "WIN 💰" : "LOSE ❌";
      resultText.className = win ? "win" : "lose";
      resultScreen.style.display = "block";

      // Отправляем результат в бот
      if (tg) {
        tg.sendData(JSON.stringify({
          action: "roulette_result",
          color: color,
          win: win,
          angle: normalizedAngle,
          sector: sector
        }));
      } else {
        console.log("Результат:", win ? "Победа" : "Проигрыш");
      }

      spinning = false;
    }, 4100); // чуть больше времени анимации (4s + запас)
  };

  // Кнопка "Играть ещё"
  window.resetGame = function() {
    resultScreen.style.display = "none";
    // Можно сбросить колесо в 0° если хочешь
    // wheel.style.transition = "none";
    // wheel.style.transform = "rotate(0deg)";
    // currentRotation = 0;
  };

  // Привязываем кнопки через addEventListener (лучше, чем onclick в HTML)
  document.getElementById("btn-red")?.addEventListener("click", () => spin("red"));
  document.getElementById("btn-black")?.addEventListener("click", () => spin("black"));
  document.getElementById("play-again")?.addEventListener("click", resetGame);
});