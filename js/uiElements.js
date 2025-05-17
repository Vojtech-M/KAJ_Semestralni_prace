
// Update HUD of game
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
export function updateLives(lives) {
    const livesElement = document.getElementById("lives");
    livesElement.textContent = `Lives: ${lives}`;
}

 let modalVisible = false;
 const modalButtons = document.querySelectorAll('.modal-button');
 const pageWrapper = document.querySelectorAll('.page-wrapper');
 const modal = document.querySelector('.modal');
 
for (let i = 0; i < modalButtons.length; i++) {
     modalButtons[i].addEventListener('click', toggleModalState)
 }

 export function toggleModalState () {
    document.body.classList.toggle('modal-visible');
 }

 


   // Menu logic

const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', toggleMenuState)

//namísto add a remove je toggle
// druhý atribut u toggle true, tak se ta řída vždycky jenom přidá, false se vždycky ubere
// namísto false tak aby tam bylo nějaká matematická oeprace
function toggleMenuState () {
        document.body.classList.toggle('menu-visible');

}

const musicCheckbox = document.querySelector("#custom-checkbox-input");
const musicVolume = document.querySelector("#musicVolume");
let audio = new Audio("./assets/audio/swimming-swing.mp3");
audio.loop = true; // Make sure it loops
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
    greeting.textContent = userName;
   

    preventDefault(); // Prevent page reload
});







// Create today's date and Christmas date
const today = new Date();
const todayš = new Date('2023-12-24T00:00:00'); // Set any date you want for testing

const christmas = new Date(today.getFullYear(), 11, 24); // 11 is December (months are 0-based)

// Calculate the difference in days
const diffTime = christmas - today;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// Use RelativeTimeFormat to display the relative time
const relativeFormatter = new Intl.RelativeTimeFormat('cz', { numeric: 'auto' });
const relativeTime = relativeFormatter.format(diffDays, 'day');


document.getElementById('christmas').textContent = `Kdy jsou Vánoce ? ${relativeTime}`;


