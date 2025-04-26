// utils.js
export function loadMap(levelURL, ctx, TileMapClass, onMapLoaded) {
    fetch(levelURL)
        .then(res => res.text())
        .then(text => {
            const tileMap = new TileMapClass(ctx, 64);
            tileMap.loadFromText(text);
            tileMap.draw();

            // Call the callback with the new tileMap
            onMapLoaded(tileMap);
        })
        .catch(err => console.error("Failed to load map:", err));
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