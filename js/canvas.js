const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let tileMap;
const towerImage = new Image();
const targetImgae = new Image();
towerImage.src = "./assets/img/tower.png";
targetImgae.src = "./assets/img/target.png";


class Tower {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.range = 100;
        this.damage = 10;
        this.lastShotTime = 0; 
        this.shootCooldown = 2000; // <- 2 seconds in ms
    }

    draw(ctx) {
        ctx.drawImage(towerImage, this.x, this.y, this.tileSize, this.tileSize);
    }

    shoot(currentTime) {
        if (currentTime - this.lastShotTime >= this.shootCooldown) {
            if (enemy) {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= this.range) {
                    console.log("Enemy hit!");
                    ctx.drawImage(targetImgae, this.x, this.y, this.tileSize, this.tileSize);
                    enemy.health -= this.damage;
                    this.lastShotTime = currentTime; // Update shot time

                    if (enemy.health <= 0) {
                        enemy = null;
                    }
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

class Enemy {
    constructor(x, y, tileSize) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.speed = 1;
        this.targetX = x;
        this.targetY = y;
        this.currentRow = y / tileSize;
        this.currentCol = x / tileSize;
        this.previousRow = null;
        this.previousCol = null;
        this.reachedTarget = true;
    }

    update() {
        if (!this.reachedTarget) {
            // Move toward target
            if (this.x < this.targetX) this.x += this.speed;
            if (this.x > this.targetX) this.x -= this.speed;
            if (this.y < this.targetY) this.y += this.speed;
            if (this.y > this.targetY) this.y -= this.speed;

            // Snap to grid
            if (Math.abs(this.x - this.targetX) < this.speed && Math.abs(this.y - this.targetY) < this.speed) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.reachedTarget = true;
                this.previousRow = this.currentRow;
                this.previousCol = this.currentCol;
                this.currentRow = this.y / this.tileSize;
                this.currentCol = this.x / this.tileSize;
            }
        } else {
            // Look around for next tile 2
            const directions = [
                { dx: 0, dy: -1 }, // Up
                { dx: 0, dy: 1 },  // Down
                { dx: -1, dy: 0 }, // Left
                { dx: 1, dy: 0 }   // Right
            ];

            for (let dir of directions) {
                const newRow = this.currentRow + dir.dy;
                const newCol = this.currentCol + dir.dx;

                // Skip previous tile (don’t go back!)
                if (newRow === this.previousRow && newCol === this.previousCol) continue;

                if (
                    newRow >= 0 && newRow < tileMap.map.length &&
                    newCol >= 0 && newCol < tileMap.map[0].length &&
                    tileMap.map[newRow][newCol] === 2
                ) {
                    this.targetX = newCol * this.tileSize;
                    this.targetY = newRow * this.tileSize;
                    this.reachedTarget = false;
                    break;
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.tileSize, this.tileSize);
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


let startTime = null;
let elapsedTime = 0;
let enemy = null;
// Money at start of game
let money = 100;


function drawTimer() {
  
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    let seconds = elapsedTime % 60;
    let minutes = Math.floor(elapsedTime / 60);
    ctx.fillText(`Time: ${minutes}:${String(seconds).padStart(2, "0")}`, 630, 30);
}
function drawMoney() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Money: ${money}`, 500, 60);
}



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
    if (enemy) {
        enemy.update();
        enemy.draw(ctx);
    }
    // Draw updated timer
    drawTimer();
    drawMoney();
    // Shoot at enemy
    tileMap.towers.forEach(tower => tower.shoot(timestamp));

    requestAnimationFrame(gameLoop);
}

// Start the loop after map is loaded
fetch("./assets/levels/map.txt")
    .then(res => res.text())
    .then(text => {
        tileMap = new TileMap(ctx, 64);
        tileMap.loadFromText(text);
        tileMap.draw();

        for (let row = 0; row < tileMap.map.length; row++) {
            for (let col = 0; col < tileMap.map[row].length; col++) {
                if (tileMap.map[row][col] === 3) {
                    enemy = new Enemy(col * 64, row * 64, 64);
                    break;
                }
            }
            if (enemy) break;
        }

        // Start the game loop
        requestAnimationFrame(gameLoop);
    })
    .catch(err => console.error("Failed to load map:", err));