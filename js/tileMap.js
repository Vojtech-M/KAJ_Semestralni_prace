
import { Tower } from "./tower.js";

export class TileMap {
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
    addTower(row, col, towerType, towerImage, targetImage, sharedState) {
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        console.log(`Adding tower at (${x}, ${y})`);
        this.towers.push(new Tower(x, y, this.tileSize, {
            towerImage: towerImage,
            targetImage: targetImage,
            towerType: towerType 
        }, sharedState));
    }
    


    removeTower(row, col) {
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        this.towers = this.towers.filter(t => !(t.x === x && t.y === y));
    }
}
