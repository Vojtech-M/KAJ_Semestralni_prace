// import logic of nameDay
import { ShowNameDay } from "./nameDay.js";

// Update HUD of game
export function updateTimer(elapsedTime) {
    /**
     * Updates the timer display on the HUD.
     * @param {number} elapsedTime - The elapsed time in seconds.
     * @returns {void}
     */
    const timerElement = document.getElementById("timer");
    let seconds = elapsedTime % 60;
    let minutes = Math.floor(elapsedTime / 60);
    timerElement.textContent = `Time: ${minutes}:${String(seconds).padStart(2, "0")}`;
}
export function updateMoney(money) {
    /** 
     * Updates the money display on the HUD.
     * @param {number} money - The current amount of money.
    */
    const moneyElement = document.getElementById("money");
    moneyElement.textContent = `Money: $${money}`;
}
export function updateLives(lives) {
    /**
     * Updates the lives display on the HUD.
     * @param {number} lives - The current number of lives.
     * @returns {void}
     */
    const livesElement = document.getElementById("lives");
    livesElement.textContent = `Lives: ${lives}`;
}



 let modalVisible = false;
 const pageWrapper = document.querySelectorAll('.page-wrapper');
 const modal = document.querySelector('.modal');
 const modalButtons = document.querySelectorAll('.modal-button');

modalButtons.forEach(button => {
    button.addEventListener('click', toggleModalState);
});

export function toggleModalState() {
    document.body.classList.toggle('modal-visible');
}

 
// Menu logic
   document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', () => {
        document.body.classList.toggle('menu-visible');
    });
});

const musicCheckbox = document.querySelector("#custom-checkbox-input");
const musicVolume = document.querySelector("#musicVolume");
let audio = new Audio("./assets/audio/swimming-swing.mp3");
audio.loop = true; // loop the audio
audio.volume = musicVolume.value / 100;

musicCheckbox.addEventListener("change", function() {
    if (musicCheckbox.checked) {
        audio.play();
    } else {
        audio.pause();
    }
});


// find SVG to change width.
const volumeTriangle = document.querySelector("#volumeTriengle");

// Update volume live when moving the range slider
musicVolume.addEventListener("input", function() {
    audio.volume = musicVolume.value / 100;
    volumeTriangle.setAttribute("width", `${musicVolume.value}px`);
  
});


// Name input logic
const form = document.getElementById("nameForm");

    form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const userName = document.getElementById("name").value.trim();
    const errorMessage = document.getElementById("error");

    if (userName.length === 0) {
      errorMessage.textContent = "Zadejte prosím své jméno.";
      return;
    }
    const validPattern = /^[a-zA-ZěščřžýáíéúůňďťĚŠČŘŽÝÁÍÉÚŮŇĎŤ]+$/;
    if (!validPattern.test(userName)) {
        errorMessage.textContent = "Jméno může obsahovat pouze písmena.";
      return;
    }

    if (userName.length >= 20) {
      errorMessage.textContent = "Jméno musí mít méně než 20 znaků.";
      return;
    }

    const greeting = document.getElementById("greeting");
    greeting.textContent = `, ${userName}!`;
    errorMessage.textContent = "";
});


// Create today's date and Christmas date
const today = new Date();
const todayš = new Date('2023-12-24T00:00:00'); // Set any date you want for testing

const christmas = new Date(today.getFullYear(), 11, 24);

// Calculate the difference in days
const diffTime = christmas - today;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// Use RelativeTimeFormat to display the relative time
const relativeFormatter = new Intl.RelativeTimeFormat('cz', { numeric: 'auto' });
const relativeTime = relativeFormatter.format(diffDays, 'day');
document.getElementById('christmas').textContent = `Kdy jsou Vánoce ? ${relativeTime}`;

ShowNameDay();