import { updateTimer, updateMoney, updateLives } from "./uiElements.js";
import { Enemy } from "./enemy.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let tileMap;
const towerImage = new Image();
const targetImgae = new Image();
towerImage.src = "./assets/img/tower.png";
targetImgae.src = "./assets/img/target.png";


let startTime = null;
let elapsedTime = 0;
let enemies = [];
let money = 100;
let lives = 10; // Initialize lives

let enemySpawnStarted = false;
let enemySpawnInterval = null;

function gameLoop(timestamp) {
    if (!startTime) startTime = timestamp;
    
    // Calculate seconds
    let secondsPassed = Math.floor((timestamp - startTime) / 1000);
    if (secondsPassed !== elapsedTime) {
        elapsedTime = secondsPassed;
    }

    // Clear top area (only timer area to avoid wiping entire canvas)
    ctx.clearRect(0, 0, 200, 40);

    // Redraw map (optional: comment out if you only want timer update)
    tileMap?.draw();

    // Update and draw the enemy
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw(ctx);
    });
    updateTimer(elapsedTime);
    updateMoney(money);
    updateLives(lives); // Update lives displayq
    // Shoot at enemy
    tileMap.towers.forEach(tower => tower.shoot(timestamp));

    if (!enemySpawnStarted) {
        enemySpawnStarted = true;

        
        enemySpawnInterval = setInterval(spawnEnemy, 3000);
        setTimeout(() => {
            clearInterval(enemySpawnInterval);
            console.log("Enemy spawning stopped after 60 seconds");
        }, 10000);
    }
   
    requestAnimationFrame(gameLoop);
}

let Level1 = "./assets/levels/map.txt"
let Level2 = "./assets/levels/map2.txt"
let Level3 = "./assets/levels/map3.txt"


function waveOfEnemies() {
    enemySpawnInterval = setInterval(spawnEnemy, 3000);
        setTimeout(() => {
            clearInterval(enemySpawnInterval);
            console.log("Enemy spawning stopped after 60 seconds");
        }, 10000);
    }   

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
    loadMap(Level1);
});
const level2 = document.getElementById("level2");

level2.addEventListener("click", function () {
    loadMap(Level2);
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




class Tower {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.range = 200;
        this.damage = 10;
        this.lastShotTime = 0; 
        this.shootCooldown = 2000; // <- 2 seconds in ms
    }

    draw(ctx) {
        ctx.drawImage(towerImage, this.x, this.y, this.tileSize, this.tileSize);
    }

    shoot(currentTime) {
        if (currentTime - this.lastShotTime >= this.shootCooldown) {
            // Find nearest enemy in range
            let target = null;
            let minDist = Infinity;

    
            enemies.forEach(e => {
                const dx = e.x - this.x;
                const dy = e.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= this.range && dist < minDist) {
                    minDist = dist;
                    target = e;
                }
            });
    
            if (target) {
                console.log("Enemy hit!");
                const hitSound = new Audio("./assets/audio/hit.wav");
                hitSound.play();

                ctx.drawImage(targetImgae, this.x, this.y, this.tileSize, this.tileSize);
                target.health -= this.damage;
                this.lastShotTime = currentTime;

               
    
                if (target.health <= 0) {
                    money += 5; // Deduct money for each shot
                    enemies = enemies.filter(e => e !== target);
                    
                }
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

    addTower(row, col) {
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        this.towers.push(new Tower(x, y, this.tileSize));
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
            money += 5;
        } else if (tileMap.map[row][col] === 0) {
            if (money >= 10) {
                tileMap.map[row][col] = 1;
                tileMap.addTower(row, col);
                money -= 10;
            }
        } else {
            console.log("Invalid tile");
        }
        tileMap.draw();
    }
});
function loadMap(levelURL) {
// Start the loop after map is loaded
fetch(levelURL)
    .then(res => res.text())
    .then(text => {
        tileMap = new TileMap(ctx, 64);
        tileMap.loadFromText(text);
        tileMap.draw();
    
        requestAnimationFrame(gameLoop); // Start the game loop

        // Start the game loop

    })
    .catch(err => console.error("Failed to load map:", err));
}


const waveOfEnemiesButton = document.getElementById("nextWaveButton");
waveOfEnemiesButton.addEventListener("click", function () {
    waveOfEnemies();
});