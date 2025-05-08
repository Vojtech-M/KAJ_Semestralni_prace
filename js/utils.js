
export function loadMap(path, ctx, TileMapClass, callback) {
    fetch(path)
        .then(response => response.text())
        .then(text => {
            const tileMap = new TileMapClass(ctx, 64, { enemies: [], money: 100 }); // předání sharedState
            tileMap.loadFromText(text);
            callback(tileMap);
        })
        .catch(error => {
            console.error("Error loading map:", error);
        });
}
// utils.js or same file
let elapsedTime = 0;

export function calculateSeconds(startTime, timestamp) {
    const secondsPassed = Math.floor((timestamp - startTime) / 1000);
    
    if (secondsPassed !== elapsedTime) {
        elapsedTime = secondsPassed;
    }

    return elapsedTime;
}

export function resetElapsedTime() {
    elapsedTime = 0;
}

