/* 

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
 */

  // Získání dnešního data ve formátu DDMM
function getTodayDate() {
    const dnes = new Date();
    const dd = String(dnes.getDate()).padStart(2, '0');
    const mm = String(dnes.getMonth() + 1).padStart(2, '0');
    return dd + mm;
}

// Načtení jména ze Svátky API
export async function ShowNameDay() {
    const date = getTodayDate();
    const url = `https://svatky.adresa.info/json?date=${date}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const jmeno = data[0].name;
        document.getElementById("svatek").textContent = `Dnes má svátek ${jmeno}`;
    } catch (error) {
        document.getElementById("svatek").textContent = "Nepodařilo se načíst svátek.";
        console.error("Chyba při načítání:", error);
    }
}
ShowNameDay();