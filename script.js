document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand();
  }

  let theWheel = null;
  let spinning = false;

  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  // Создаём колесо
  theWheel = new Winwheel({
    'canvasId': 'wheel',
    'outerRadius': 140,
    'textFontSize': 16,
    'textFillStyle': 'white',
    'animation': {
      'type': 'spinToStop',
      'duration': 4,
      'spins': 8,
      'callbackFinished': onSpinEnd
    },
    'pins': {
      'number': 24,
      'fillStyle': 'silver',
      'outerRadius': 4
    },
    'segments': [
      {'fillStyle' : '#ff0000', 'text' : 'Красный'},
      {'fillStyle' : '#000000', 'text' : 'Чёрный'},
      {'fillStyle' : '#ff0000', 'text' : 'Красный'},
      {'fillStyle' : '#000000', 'text' : 'Чёрный'},
      {'fillStyle' : '#ff0000', 'text' : 'Красный'},
      {'fillStyle' : '#000000', 'text' : 'Чёрный'},
      {'fillStyle' : '#ff0000', 'text' : 'Красный'},
      {'fillStyle' : '#000000', 'text' : 'Чёрный'}
    ]
  });

  function onSpinEnd() {
    spinning = false;
    const winningSegment = theWheel.getIndicatedSegment();
    const isRed = winningSegment.fillStyle === '#ff0000';

    resultText.textContent = isRed ? "Выпал КРАСНЫЙ! WIN 💰" : "Выпал ЧЁРНЫЙ! LOSE ❌";
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

  // Кнопки
  document.getElementById("btn-red").addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    resultScreen.style.display = "none";
    theWheel.startAnimation();
  });

  document.getElementById("btn-black").addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    resultScreen.style.display = "none";
    theWheel.startAnimation();
  });

  document.getElementById("play-again").addEventListener("click", () => {
    resultScreen.style.display = "none";
  });
});