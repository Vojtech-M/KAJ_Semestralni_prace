import { updateTimer, updateMoney, updateLives } from "./uiElements.js";
import { Enemy } from "./enemy.js";
import { Tower } from "./tower.js";
import { loadMap, calculateSeconds } from "./utils.js";
import { toggleModalState } from "./uiElements.js";


let Level1 = "./assets/levels/map.txt"
let Level2 = "./assets/levels/map2.txt"
let Level3 = "./assets/levels/map3.txt"

let sharedState = {
    enemies: [],
    money: 100
};

let enemies = sharedState.enemies;
let money = sharedState.money;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const towerImage = new Image();
const targetImgae = new Image();
towerImage.src = "./assets/img/tower.png";
targetImgae.src = "./assets/img/target.png";

let tileMap;
let startTime = null;
let elapsedTime = 0;
let lives = 10;
let enemySpawnStarted = false;
let enemySpawnInterval = null;

function gameLoop(timestamp) {
    if (!startTime) startTime = timestamp;
    
    elapsedTime = calculateSeconds(startTime, timestamp);

    tileMap?.draw();

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
    if (lives <= 0) {
        alert("Game Over! You have lost all your lives.");
        stopGame();
        return;
    }

    if (!enemySpawnStarted) {
        enemySpawnStarted = true;

        enemySpawnInterval = setInterval(spawnEnemy, 3000);
        setTimeout(() => {
            clearInterval(enemySpawnInterval);
            console.log("Enemy spawning stopped after 60 seconds");
        }, 10000);
    }
   
   startGame();
}

function startGame() {
    requestAnimationFrame(gameLoop);
}

function restartVariables(){
    sharedState.enemies = [];
    sharedState.money = 100;
    tileMap = null;
    startTime = null;
    elapsedTime = 0;
    lives = 10;
    enemySpawnStarted = false;
    enemySpawnInterval = null;
    enemies = sharedState.enemies;
    money = sharedState.money;
}

function stopGame() {
    cancelAnimationFrame(gameLoop);
    clearInterval(enemySpawnInterval);
    console.log("Game loop stopped");
    toggleModalState ()
    restartVariables();
}




function waveOfEnemies() {
    enemySpawnInterval = setInterval(spawnEnemy, 1000);
        setTimeout(() => {
            clearInterval(enemySpawnInterval);
            console.log("Enemy spawning stopped after 60 seconds");
        }, 3000);
    }   



const waveOfEnemiesButton = document.getElementById("nextWaveButton");
waveOfEnemiesButton.addEventListener("click", function () {
    waveOfEnemies();
});

// Start the game from level 
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
    loadMap(Level1, ctx, TileMap, function (map) {
        tileMap = map; // Update your local tileMap references
        requestAnimationFrame(gameLoop); // Start the game loop
    });
});


const level2 = document.getElementById("level2");
level2.addEventListener("click", function () {
    loadMap(Level2, ctx, TileMap, function (map) {
        tileMap = map; // Update your local tileMap reference
        requestAnimationFrame(gameLoop); // Start the game loop
    });
});




const towerIcons = document.getElementsByClassName("towerIcon");

towerIcons[0].addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "basic");
});

towerIcons[1].addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "better");
});
canvas.addEventListener("dragover", (e) => {
    e.preventDefault(); // Required to allow drop
});

canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!tileMap) return;

    const data = e.dataTransfer.getData("text/plain");
    if (data !== "basic" && data !== "better") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / tileMap.tileSize);
    const row = Math.floor(y / tileMap.tileSize);

    if (tileMap.map[row][col] === 0 && sharedState.money >= 10) {
        tileMap.map[row][col] = 1;
        tileMap.addTower(row, col, data);
        sharedState.money-= 10;
        updateMoney(sharedState.money);
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


class TileMap {
    constructor(ctx, tileSize) {
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.map = [];
        this.towers = []; // Store tower instances
    }

    loadFromArray(array2D) {
        this.map = array2D;
    }

    loadFromText(text) {
        const rows = text.trim().split("\n");
        this.map = rows.map(row => row.split("").map(Number));
    }

    draw() {
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                const tile = this.map[row][col];
                const x = col * this.tileSize;
                const y = row * this.tileSize;

                if (tile === 2) {
                    this.ctx.fillStyle = "black";
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                } else if (tile === 3) {
                    this.ctx.fillStyle = "green";
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                } else if (tile === 4) {
                    this.ctx.fillStyle = "blue";
                    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
                } else {
                    this.ctx.clearRect(x, y, this.tileSize, this.tileSize);
                }
            }
        }

        // Draw towers after base tiles
        this.towers.forEach(tower => tower.draw(this.ctx));
    }

   addTower(row, col, towerType) {
    const x = col * this.tileSize;
    const y = row * this.tileSize;
    this.towers.push(new Tower(x, y, this.tileSize, {
        towerImage: towerImage,
        targetImage: targetImgae,
        towerType: towerType  // <-- store the type if needed
    }, sharedState));
}

    removeTower(row, col) {
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        this.towers = this.towers.filter(t => !(t.x === x && t.y === y));
    }
}



canvas.addEventListener("click", function(event) {
    if (!tileMap) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / 64);
    const row = Math.floor(y / 64);

    if (row >= 0 && row < tileMap.map.length && col >= 0 && col < tileMap.map[row].length) {
        if (tileMap.map[row][col] === 1) {
            tileMap.map[row][col] = 0;
            tileMap.removeTower(row, col);
            sharedState.money += 5;
        } else if (tileMap.map[row][col] === 0) {
            if (sharedState.money >= 10) {
                tileMap.map[row][col] = 1;
                tileMap.addTower(row, col);
                sharedState.money -= 10;
            }
        } else {
            console.log("Invalid tile");
        }
        tileMap.draw();
    }
});




const stopGameButton = document.getElementById('stopGameButton');
stopGameButton.addEventListener("click", function () {
    stopGame();
    toggleModalState();
});
