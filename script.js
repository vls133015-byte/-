document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) tg.expand();

  let spinning = false;
  let currentRotation = 0; // чтобы колесо продолжало крутиться от текущего положения

  window.spin = function(color) {
    if (spinning) return;
    spinning = true;

    const wheel = document.getElementById("wheel");
    if (!wheel) {
      console.error("Колесо не найдено!");
      spinning = false;
      return;
    }

    // случайный угол (прибавляем к текущему)
    const rotation = currentRotation + 360 * 5 + Math.floor(Math.random() * 360);
    currentRotation = rotation; // сохраняем текущее положение

    wheel.style.transform = rotate(${rotation}deg);

    setTimeout(() => {
      const win = Math.random() < 0.5;

      // Для теста без Telegram
      alert(`Вы выбрали ${color}. ${win ? "WIN 💰" : "LOSE ❌"}`);

      // Если Web App Telegram:
      // if (tg) tg.sendData(JSON.stringify({ game: "roulette", color, win }));

      spinning = false;
    }, 2800);
  };
});