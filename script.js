const tg = window.Telegram.WebApp;
tg.expand();

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const segments = ["red", "black", "red", "black", "red", "black", "red", "black"];
const segmentCount = segments.length;
let spinning = false;

// Рисуем колесо
function drawWheel(rotation = 0) {
    const center = canvas.width / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segmentCount; i++) {
        const startAngle = (i * 2 * Math.PI / segmentCount) + rotation;
        const endAngle = ((i + 1) * 2 * Math.PI / segmentCount) + rotation;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, startAngle, endAngle);
        ctx.fillStyle = segments[i];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }
}

// Начальное колесо
drawWheel();

function placeBet(color) {
    if (spinning) return;
    spinning = true;

    const resultDiv = document.getElementById('result');
    const spins = 20 + Math.random() * 10; // случайное вращение
    let rotation = 0;
    let count = 0;

    const interval = setInterval(() => {
        rotation += 0.3;
        drawWheel(rotation);
        count++;
        if (count >= spins * 10) {
            clearInterval(interval);

            // Определяем результат
            const winningIndex = Math.floor((rotation % (2 * Math.PI)) / ((2 * Math.PI) / segmentCount));
            const resultColor = segments[winningIndex];

            let win = color === resultColor;

            resultDiv.innerHTML = Выпало: ${resultColor}<br>${win ? '🎉 Вы выиграли!' : '❌ Вы проиграли'};

            // Отправляем результат боту
            tg.sendData(JSON.stringify({
                bet: color,
                result_color: resultColor,
                win: win
            }));

            document.getElementById('play-again').style.display = 'inline-block';
            spinning = false;
        }
    }, 20);
}

function resetGame() {
    document.getElementById('result').innerHTML = 'Сделайте ставку';
    document.getElementById('play-again').style.display = 'none';
    drawWheel();
}