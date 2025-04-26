export class Tower {
    constructor(x, y, tileSize, images, sharedState) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.range = 200;
        this.damage = 10;
        this.lastShotTime = 0;
        this.shootCooldown = 2000;

        this.towerImage = images.towerImage;
        this.targetImage = images.targetImage;

        this.sharedState = sharedState; // contains enemies and money reference
    }

    draw(ctx) {
        ctx.drawImage(this.towerImage, this.x, this.y, this.tileSize, this.tileSize);
    }

    shoot(currentTime, ctx) {
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
                        this.sharedState.enemies.splice(index, 1); // Remove target properly
                    }
                }
            }
        }
    }
}
