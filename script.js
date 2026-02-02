const tg = window.Telegram.WebApp;
tg.expand();

let spinning = false;

function spin(color) {
  if (spinning) return;
  spinning = true;

  const wheel = document.getElementById("wheel");

  // случайный угол
  const rotation = 360 * 5 + Math.floor(Math.random() * 360);

  wheel.style.transform = rotate(${rotation}deg);

  setTimeout(() => {
    const win = Math.random() < 0.5;

    tg.sendData(JSON.stringify({
      game: "roulette",
      color: color,
      win: win
    }));

    spinning = false;
  }, 2800);
}