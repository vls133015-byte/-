document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  let theWheel;
  let spinning = false;

  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  // 🎡 СОЗДАЁМ КОЛЕСО
theWheel = new Winwheel({
  canvasId: 'wheel',
  outerRadius: 100,
  textFontSize: 14,
  textFillStyle: 'white',
  lineWidth: 2,
  strokeStyle: 'gold',
  animation: {
    type: 'spinToStop',
    duration: 4,
    spins: 8,
    callbackFinished: onSpinEnd
  },
  segments: [
    { fillStyle: '#ff0000', text: 'Красный' },
    { fillStyle: '#000000', text: 'Чёрный' },
    { fillStyle: '#ff0000', text: 'Красный' },
    { fillStyle: '#000000', text: 'Чёрный' },
    { fillStyle: '#ff0000', text: 'Красный' },
    { fillStyle: '#000000', text: 'Чёрный' },
    { fillStyle: '#ff0000', text: 'Красный' },
    { fillStyle: '#000000', text: 'Чёрный' }
  ]
});

// 🔥 ВАЖНО — ДОрисовать колесо
theWheel.draw();

  // 🔄 СБРОС КОЛЕСА
  function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    spinning = false;
  }

  // 🏁 КОНЕЦ ВРАЩЕНИЯ
  function onSpinEnd() {
    spinning = false;

    const winningSegment = theWheel.getIndicatedSegment();
    const isRed = winningSegment.fillStyle === '#ff0000';

    resultText.textContent = isRed
      ? "Выпал КРАСНЫЙ! WIN 💰"
      : "Выпал ЧЁРНЫЙ! LOSE ❌";

    resultText.className = isRed ? "win" : "lose";
    resultScreen.style.display = "block";

    if (tg) {
      tg.sendData(JSON.stringify({
        action: "roulette_result",
        win: isRed,
        color: isRed ? "red" : "black"
      }));
    }
  }

  // 🔴 КНОПКА КРАСНОЕ
  document.getElementById("btn-red").addEventListener("click", () => {
    if (spinning) return;
    resetWheel();
    spinning = true;
    resultScreen.style.display = "none";
    theWheel.startAnimation();
  });

  // ⚫ КНОПКА ЧЁРНОЕ
  document.getElementById("btn-black").addEventListener("click", () => {
    if (spinning) return;
    resetWheel();
    spinning = true;
    resultScreen.style.display = "none";
    theWheel.startAnimation();
  });

  // 🔁 ИГРАТЬ ЕЩЁ
  document.getElementById("play-again").addEventListener("click", () => {
    resultScreen.style.display = "none";
    resetWheel();
  });

});