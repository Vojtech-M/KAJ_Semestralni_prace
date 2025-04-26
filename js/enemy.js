export class Enemy {
    constructor(x, y, tileSize, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.speed = 2;
        this.targetX = x;
        this.targetY = y;
        this.currentRow = y / tileSize;
        this.currentCol = x / tileSize;
        this.previousRow = null;
        this.previousCol = null;
        this.reachedTarget = true;
        this.reachedEnd = false;
        this.health = 100;
        this.tileMap = tileMap;
    }

    update() {
        if (!this.reachedTarget) {
            if (this.x < this.targetX) this.x += this.speed;
            if (this.x > this.targetX) this.x -= this.speed;
            if (this.y < this.targetY) this.y += this.speed;
            if (this.y > this.targetY) this.y -= this.speed;

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
            const directions = [
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 },
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 }
            ];

            for (let dir of directions) {
                const newRow = this.currentRow + dir.dy;
                const newCol = this.currentCol + dir.dx;

                if (newRow === this.previousRow && newCol === this.previousCol) continue;

                if (
                    newRow >= 0 && newRow < this.tileMap.map.length &&
                    newCol >= 0 && newCol < this.tileMap.map[0].length
                ) {
                    const nextTile = this.tileMap.map[newRow][newCol];

                    if (nextTile === 2 || nextTile === 4) {
                        this.targetX = newCol * this.tileSize;
                        this.targetY = newRow * this.tileSize;
                        this.reachedTarget = false;

                        if (nextTile === 4) {
                            this.reachedEnd = true;
                        }

                        break;
                    }
                }
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.tileSize, this.tileSize);
    }
}
