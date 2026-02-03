const wheel = document.getElementById("wheel");
const btnRed = document.getElementById("btn-red");
const btnBlack = document.getElementById("btn-black");
const resultScreen = document.getElementById("result");
const resultText = document.getElementById("result-text");
const playAgain = document.getElementById("play-again");

let spinning = false;

function spin(selected) {
  if (spinning) return;
  spinning = true;

  const result = Math.random() < 0.5 ? "red" : "black";
  const rotation = 1440 + Math.floor(Math.random() * 360);

  wheel.style.transform = rotate(${rotation}deg);

  setTimeout(() => {
    resultText.innerText =
      result === selected
        ? "🎉 Ты выиграл!"
        : "😢 Ты проиграл";

    resultScreen.style.display = "block";
    spinning = false;
  }, 3000);
}

btnRed.addEventListener("click", () => spin("red"));
btnBlack.addEventListener("click", () => spin("black"));

playAgain.addEventListener("click", () => {
  resultScreen.style.display = "none";
});