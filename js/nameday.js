
function getTodayDate() {
    /**
     * Get the current date in the format DDMM.
     * @returns {string} The current date in the format DDMM.
     */
    const dnes = new Date();
    const dd = String(dnes.getDate()).padStart(2, '0');
    const mm = String(dnes.getMonth() + 1).padStart(2, '0');
    return dd + mm;
}

export function ShowNameDay() {
    /**
     * Fetches the name day for today and displays it on the page.
     * @returns {void}
     */
    const date = getTodayDate();
    const url = `https://svatky.adresa.info/json?date=${date}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Síťová chyba nebo chyba serveru');
            }
            return response.json();
        })
        .then(data => {
            const jmeno = data[0].name;
            document.getElementById("svatek").textContent = `Dnes má svátek ${jmeno}`;
        })
        .catch(error => {
            document.getElementById("svatek").textContent = "Nepodařilo se načíst svátek.";
            console.error("Chyba při načítání:", error);
        });
}
