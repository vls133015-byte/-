document.addEventListener("DOMContentLoaded", () => {
  let spinning = false;
  let betColor = null;

  const resultScreen = document.getElementById("result");
  const resultText = document.getElementById("result-text");

  const theWheel = new Winwheel({
    canvasId: 'wheel',
    outerRadius: 100,
    textFontSize: 14,
    textFillStyle: 'white',
    lineWidth: 2,
    strokeStyle: 'gold',
    segments: wheelSegments,
    animation: {
      type: 'spinToStop',
      duration: 4,
      spins: 8,
      callbackFinished: onSpinEnd
    }
  });

  theWheel.draw();

  function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    spinning = false;
    betColor = null;
  }

  function onSpinEnd() {
    spinning = false;
    const winningSegment = theWheel.getIndicatedSegment();
    const winColor = winningSegment.fillStyle === '#ff0000' ? 'red' : 'black';

    if (!betColor) {
      resultText.textContent = Выпал ${winningSegment.text};
    } else if (betColor === winColor) {
      resultText.textContent = Выпал ${winningSegment.text}! WIN 💰;
      resultText.className = 'win';
    } else {
      resultText.textContent = Выпал ${winningSegment.text}! LOSE ❌;
      resultText.className = 'lose';
    }

    resultScreen.style.display = 'block';
  }

  document.getElementById("btn-red").addEventListener("click", () => {
    if (spinning) return;
    betColor = 'red';
    spinning = true;
    resultScreen.style.display = 'none';
    theWheel.startAnimation();
  });

  document.getElementById("btn-black").addEventListener("click", () => {
    if (spinning) return;
    betColor = 'black';
    spinning = true;
    resultScreen.style.display = 'none';
    theWheel.startAnimation();
  });

  document.getElementById("play-again").addEventListener("click", () => {
    resultScreen.style.display = 'none';
    resetWheel();
  });
});