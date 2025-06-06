/*
    * Tower class for a tower defense game.
    * Represents a tower that can shoot at enemies within its range.
*/
export class Tower {
    /**
     *  Constructor for the Tower class.
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} tileSize 
     * @param {*} images 
     * @param {*} sharedState 
     */
    constructor(x, y, tileSize, images, sharedState) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.range = 200;
        this.damage = 15;
        this.lastShotTime = 0;
        this.shootCooldown = 2000; // 2 seconds

        this.towerImage = images.towerImage;
        this.towerType = images.towerType; 
        this.targetImage = images.targetImage;
        this.sharedState = sharedState;
    }
    
    draw(ctx) {
        /**
         * Draws the tower on the canvas.
         * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
         * @returns {void}
         */
        ctx.drawImage(this.towerImage, this.x, this.y, this.tileSize, this.tileSize);
    }

    shoot(currentTime, ctx) {
        /**
         * Shoots at the nearest enemy within range.
         * @param {number} currentTime - The current time in milliseconds.
         * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
         * @returns {void}
         */
        if (currentTime - this.lastShotTime >= this.shootCooldown) {
            const enemies = this.sharedState.enemies;

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

                ctx.drawImage(this.targetImage, this.x, this.y, this.tileSize, this.tileSize);
                target.health -= this.damage;
                this.lastShotTime = currentTime;

                if (target.health <= 0) {
                    this.sharedState.money += 5;
                    const index = this.sharedState.enemies.indexOf(target);
                    if (index !== -1) {
                        this.sharedState.enemies.splice(index, 1);
                    }
                }
            }
        }
    }
}
