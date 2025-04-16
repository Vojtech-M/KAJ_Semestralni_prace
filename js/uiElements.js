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




 // Modal logic

 let modalVisible = false;
 const modalButtons = document.querySelectorAll('.modal-button');
 const pageWrapper = document.querySelectorAll('.page-wrapper');
 const modal = document.querySelector('.modal');

 for (let i = 0; i < modalButtons.length; i++) {
     modalButtons[i].addEventListener('click', toggleModalState)
 }

 function toggleModalState () {
     modalVisible = !modalVisible;
     if (modalVisible) {
         document.body.classList.add('modal-visible');
     } else {
         document.body.classList.remove('modal-visible');
     }
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