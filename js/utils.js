
export function loadMap(path, ctx, TileMapClass, callback) {
    /**
     * Načte mapu z textového souboru a vytvoří instanci TileMapClass.
     * @param {string} path - Cesta k textovému souboru s mapou.
     * @param {CanvasRenderingContext2D} ctx - Kontext plátna pro vykreslování.
     * @param {function} TileMapClass - Třída pro vytvoření mapy.
     * @param {function} callback - Funkce, která se zavolá po načtení mapy.
     * @returns {void}
     * @throws {Error} Pokud dojde k chybě při načítání mapy.   
     */
    fetch(path)
        .then(response => response.text())
        .then(text => {
            const tileMap = new TileMapClass(ctx, 64, { enemies: [], money: 60 }); // předání sharedState
            tileMap.loadFromText(text);
            callback(tileMap);
        })
        .catch(error => {
            console.error("Error loading map:", error);
        });
}

let elapsedTime = 0;
export function calculateSeconds(startTime, timestamp) {
    /**
     * Calculates the elapsed time in seconds since the start time.
     * @param {number} startTime - The start time in milliseconds.
     * @param {number} timestamp - The current time in milliseconds.
     * @returns {number} The elapsed time in seconds.
     * 
     */
    const secondsPassed = Math.floor((timestamp - startTime) / 1000);
    
    if (secondsPassed !== elapsedTime) {
        elapsedTime = secondsPassed;
    }

    return elapsedTime;
}

export function resetElapsedTime() {
    /**
     * Resetuje uplynulý čas na 0.
     * @returns {void}
     */
    elapsedTime = 0;
}

