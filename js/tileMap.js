import { Tower } from "./tower.js";

export class TileMap {
    /**
     * Represents a tile map for a game.
    */
    constructor(ctx, tileSize) {
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.map = [];
        this.towers = []; // Store tower instances
        this.startImage = new Image();
        this.startImage.src = "./assets/img/tiles/startFlag.png";
        this.grassImage = new Image();
        this.grassImage.src = "./assets/img/tiles/grass.png";
        this.dirtImage = new Image();
        this.dirtImage.src = "./assets/img/tiles/dirt.png";
        this.endImage = new Image();
        this.endImage.src = "./assets/img/tiles/end.png";
        }

    loadFromArray(array2D) {
        /**
         * Loads the map from a 2D array.
         * @param {Array<Array<number>>} array2D - The 2D array representing the map.
         * @returns {void}
         */
        this.map = array2D;
    }

    loadFromText(text) {
        /*
        * Loads the map from a text representation.
        * @param {string} text - The text representation of the map.
        * @returns {void}
        * */
        const rows = text.trim().split("\n");
        this.map = rows.map(row => row.split("").map(Number));
    }

    draw() {
        /**
         * Draws the map on the canvas. 
         * @returns {void}
         * */
        for (let row = 0; row < this.map.length; row++) {
            for (let col = 0; col < this.map[row].length; col++) {
                const tile = this.map[row][col];
                const x = col * this.tileSize;
                const y = row * this.tileSize;

                if (tile === 2) {
                    this.ctx.drawImage(this.dirtImage, x, y, this.tileSize, this.tileSize);
                } else if (tile === 3) {
                    this.ctx.drawImage(this.startImage, x, y, this.tileSize, this.tileSize);
                } else if (tile === 4) {
                    this.ctx.drawImage(this.endImage, x, y, this.tileSize, this.tileSize);
                } else {
                    this.ctx.drawImage(this.grassImage, x, y, this.tileSize, this.tileSize);
                }
            }
        }

        // Draw towers after base tiles
        this.towers.forEach(tower => tower.draw(this.ctx));
    }
    addTower(row, col, towerType, towerImage, targetImage, sharedState) {
        /**
         * Adds a tower to the map.
         * @param {number} row - The row index of the tower.
         * @param {number} col - The column index of the tower.
         * @param {string} towerType - The type of the tower.
         * @param {HTMLImageElement} towerImage - The image of the tower.
         * @param {HTMLImageElement} targetImage - The image of the target.
         * @param {Object} sharedState - Shared state object containing game state.
         * @returns {void}
         */
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
        /*
        * Removes a tower from the map.
        * @param {number} row - The row index of the tower.
        * @param {number} col - The column index of the tower.
        * @returns {void}
        */
        const x = col * this.tileSize;
        const y = row * this.tileSize;
        this.towers = this.towers.filter(t => !(t.x === x && t.y === y));
    }
}
