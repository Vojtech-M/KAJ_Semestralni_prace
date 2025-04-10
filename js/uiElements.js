export function updateTimer(elapsedTime) {
    const timerElement = document.getElementById("timer");
    let seconds = elapsedTime % 60;
    let minutes = Math.floor(elapsedTime / 60);
    timerElement.textContent = `Time: ${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function updateMoney(money) {
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = `Money: $${money}`;
}
