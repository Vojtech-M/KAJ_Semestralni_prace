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
        this.map = [];
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

    // Create new enemy
    let enemy = new Enemy(ctx, 0, 0, 1);
    enemy.draw();
});

//přidat se Weather API 

class Enemy{

    constructor(ctx, x, y, speed){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 64;
        this.height = 64;
    }

    draw(){
        this.ctx.fillStyle = "red";
        for(let i = 0; i < 10; i++){
            this.x += this.speed;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }




}

//weather API
async function makeRequest(url, isJson = true) {
    try {
        const response = await fetch(url);
        return isJson ? response.json() : response.text();  // vratime Promise
    } catch (error) {
        console.error(`Chyba při načítání ${url}:`, error);
        return null;
    }
}

async function getCountryAndWeather(countryName, cityName) {
    const countryAPI = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,region,population,currencies`;
    const weatherAPI = `https://wttr.in/${cityName}?format=3`;

    try {
        // We can use Promise.all() to fetch both APIs simultaneously and wait for both responses
        const responses = await Promise.all([
            makeRequest(countryAPI),
            makeRequest(weatherAPI, false)
        ]);

        const countryData = responses[0];  // First API: REST Countries
        const weatherData = responses[1];  // Second API: wttr.in

        if (!countryData || !weatherData) {
            throw new Error("Nepodařilo se načíst data.");
        }

        const country = countryData[0];
        let formatted = `
            ${weatherData}
            ${country.name.common} (${country.capital[0]}) - ${country.region}
            Population: ${country.population}
            Currency: ${Object.values(country.currencies)[0].name}
        `;

        return formatted
    } catch (error) {
        console.error("Chyba při zpracování dat:", error);
        return null;
    }
}

 getCountryAndWeather("Czechia", "Prague").then(data => console.log(data));
