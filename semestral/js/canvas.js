const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Declare tileMap in outer scope so it's accessible everywhere
let tileMap;

const tileImage = new Image();
tileImage.src = "tower.png";


class TileMap {

    constructor(ctx, tileSize) {
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.map = []; // will hold 2D array of tile values
    
    
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

                if (tile === 1) {
                    this.ctx.drawImage(tileImage, x, y, this.tileSize, this.tileSize);
                } else {
                    // Optional: clear other tiles
                    this.ctx.clearRect(x, y, this.tileSize, this.tileSize);
                }
            }
        }
    }
}

// Create the map from file
fetch("map.txt")
    .then(res => res.text())
    .then(text => {
        tileMap = new TileMap(ctx, 64);
        tileMap.loadFromText(text);
        tileMap.draw();
    })
    .catch(err => console.error("Failed to load map:", err));

// Click event (outside fetch)
canvas.addEventListener("click", function(event) {
    if (!tileMap) return; // map not loaded yet

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / 64);
    const row = Math.floor(y / 64);

    console.log(`Clicked on row ${row}, col ${col}`);

    // Safety check
    if (row >= 0 && row < tileMap.map.length && col >= 0 && col < tileMap.map[row].length) {
        if (tileMap.map[row][col] === 1) {
            tileMap.map[row][col] = 0;
        } else {
            tileMap.map[row][col] = 1;
        }
        tileMap.draw();
    }
});
