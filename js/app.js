import { updateTimer, updateMoney, updateLives } from "./uiElements.js";
import { Enemy } from "./enemy.js";
import { Tower } from "./tower.js";
import { loadMap, calculateSeconds } from "./utils.js";
import { toggleModalState } from "./uiElements.js";
import { TileMap } from "./tileMap.js";

// level paths
let Level1 = "./assets/levels/map.txt"
let Level2 = "./assets/levels/map2.txt"
let Level3 = "./assets/levels/map3.txt"

let sharedState = {
    enemies: [],
    money: 60,
};
let enemies = sharedState.enemies;
let money = sharedState.money;
let waveTimeouts = [];

// Initialize canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const towerImage = new Image();
const targetImgae = new Image();
const betterTowerImage = new Image();
towerImage.src = "./assets/img/tower.png";
targetImgae.src = "./assets/img/target.png";
betterTowerImage.src = "./assets/img/water_tower.png";

// Initialize variables
let tileMap;
let startTime = null;
let elapsedTime = 0;
let lives = 10;
let enemySpawnStarted = false;
let enemySpawnInterval = null;
let wave = 0;
let wavesSpawned = false;
        

function gameLoop(timestamp) {
    /**
     * Main game loop that updates the game state and renders the game.
     * @param {number} timestamp - The current time in milliseconds.
     * @returns {void}
     */
    if (!startTime) startTime = timestamp;
    elapsedTime = calculateSeconds(startTime, timestamp);

    // Update HUD
    tileMap.draw();
    updateTimer(elapsedTime);
    updateMoney(sharedState.money);
    updateLives(lives);

    tileMap.towers.forEach(tower => tower.shoot(timestamp, ctx));
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();
    
        if (enemy.reachedEnd) {
            enemies.splice(i, 1);
            lives = Math.max(0, lives - 1);
            updateLives(lives);
            console.log("Enemy removed at endpoint. Lives left:", lives);
            break; 
        }
        enemy.draw(ctx);
    }

    // Check if the game is over
    if (lives <= 0) {
        alert("Game Over! You have lost all your lives.");
        stopGame();
        return;
    }

    if (!enemySpawnStarted) {
        enemySpawnStarted = true;
        waveOfEnemies(1,4);
        startWaves();
        console.log(wave)
    }

    if (wavesSpawned && enemies.length === 0) {
        alert("Congratulations! You have completed all waves.");
        stopGame();
        return;
    }
    // Start the Game 
    requestAnimationFrame(gameLoop);
}

function stopGame() {
    /*
    * Stops the game loop and resets the game state.
    * @returns {void}
    */
    cancelAnimationFrame(gameLoop);
    clearInterval(enemySpawnInterval);
    console.log("Game loop stopped");

    waveTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    waveTimeouts = [];
    toggleModalState ()
    restartVariables();
}
const stopGameButton = document.getElementById('stopGameButton');
stopGameButton.addEventListener("click", function () {
    stopGame();
    toggleModalState();
});



function startWaves() {
    /**
     * Starts the waves of enemies.
     * @returns {void}
     */
    waveOfEnemies(1, 4); // Spawn every 1 second for 4 seconds
   waveTimeouts.push(setTimeout(() => {
    waveOfEnemies(0.8, 8); 
    }, 10000));

    waveTimeouts.push(setTimeout(() => {
        waveOfEnemies(0.7, 12); 
        wavesSpawned = true; 
    }, 18000));

    waveTimeouts.push(setTimeout(() => {
        waveOfEnemies(0.6, 20); 
        wavesSpawned = true; 
    }, 26000));
}

function waveOfEnemies(spawnSpeed, length) {
    /*
    * Spawns a wave of enemies.
    * @param {number} spawnSpeed - The speed of enemy spawning.
    * @param {number} length - The length of the wave.
    * @returns {void}
    */

    wave++;  

    console.log(`Wave ${wave} started`); // Display wave number
    if (enemySpawnInterval) {
        clearInterval(enemySpawnInterval);
        console.log("Enemy spawning stopped");
    }
    enemySpawnInterval = setInterval(spawnEnemy, spawnSpeed * 1000); // Spawn every spawnSpeed seconds
    setTimeout(() => {
        clearInterval(enemySpawnInterval);
        console.log("Enemy spawning stopped after 60 seconds");
        console.log(`Wave ${wave} ended`);
    }, length * 1000); 
}   


function restartVariables(){
    sharedState.enemies = [];
    sharedState.money = 60;
    tileMap = null;
    startTime = null;
    elapsedTime = 0;
    lives = 10;
    enemySpawnStarted = false;
    enemySpawnInterval = null;
    enemies = sharedState.enemies;
    money = sharedState.money;
    wavesSpawned = false;
    waveTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    waveTimeouts = [];
    wave = 0;
}


function spawnSingleEnemy() {
    spawnEnemy();
}

const waveOfEnemiesButton = document.getElementById("nextWaveButton");
waveOfEnemiesButton.addEventListener("click", function () {
    spawnSingleEnemy();
});

// Start the game from level 
const level1 = document.getElementById("level1");
level1.addEventListener("click", function () {
    restartVariables();
    loadMap(Level1, ctx, TileMap, function (map) {
        tileMap = map;
        requestAnimationFrame(gameLoop);
    });
});

const level2 = document.getElementById("level2");
level2.addEventListener("click", function () {
     restartVariables();
    loadMap(Level2, ctx, TileMap, function (map) {
        tileMap = map; // Update your local tileMap reference
        requestAnimationFrame(gameLoop); // Start the game loop
    });
});

const level3 = document.getElementById("level3");
level3.addEventListener("click", function () {
     restartVariables();
    loadMap(Level3, ctx, TileMap, function (map) {
        tileMap = map; // Update your local tileMap reference
        requestAnimationFrame(gameLoop); // Start the game loop
    });
});

const towerIcons = document.getElementsByClassName("towerIcon");

towerIcons[0].addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "basic");
});

canvas.addEventListener("dragover", (e) => {
    e.preventDefault(); // Required to allow drop
});

canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!tileMap) return;

    const data = e.dataTransfer.getData("text/plain");
    if (data !== "basic" && data !== "better") return; // add types of towers

    const rect = canvas.getBoundingClientRect();
    // Calculate the mouse position relative to the canvas -- use for small screens
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const col = Math.floor(x / tileMap.tileSize);
    const row = Math.floor(y / tileMap.tileSize);

    if (tileMap.map[row][col] === 0 && sharedState.money >= 20) {
        tileMap.map[row][col] = 1;
        tileMap.addTower(row, col, "basic", towerImage, targetImgae, sharedState);
        updateMoney(sharedState.money);
        sharedState.money -= 20;
        tileMap.draw();
    } else {
        console.log("Invalid tile or not enough money");
    }
});




function spawnEnemy() {
    for (let row = 0; row < tileMap.map.length; row++) {
        for (let col = 0; col < tileMap.map[row].length; col++) {
            if (tileMap.map[row][col] === 3) { // Starting point tile
                const enemy = new Enemy(col * 64, row * 64, 64, tileMap);
                enemy.health = 30 + Math.random() * 20;
                enemies.push(enemy);
                return;
            }
        }
        
    }
}
canvas.addEventListener("click", function(event) {
    if (!tileMap) return;

    const rect = canvas.getBoundingClientRect();
    // Calculate the mouse position relative to the canvas
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
        const col = Math.floor(x / 64);
    const row = Math.floor(y / 64);

    if (row >= 0 && row < tileMap.map.length && col >= 0 && col < tileMap.map[row].length) {
        if (tileMap.map[row][col] === 1) {
            tileMap.map[row][col] = 0;
            tileMap.removeTower(row, col);
            sharedState.money += 5;
        } else if (tileMap.map[row][col] === 0) {
            if (sharedState.money >= 20) {
                tileMap.map[row][col] = 1;
                tileMap.addTower(row, col, "basic", towerImage, targetImgae, sharedState);
                sharedState.money -= 20;
                updateMoney(sharedState.money);
            }
        } else {
            console.log("Invalid tile");
        }
        tileMap.draw();// Redraw the map after adding/removing a tower
    }
});
