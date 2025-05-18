# Cíl projektu  
Cílem projektu je vytvořit single-page webovou aplikaci typu tower defense, kde hráč staví obranné věže proti vlnám nepřátel. Hra je inspirovaná tituly jako **Bloons TD Battles** nebo **Desktop Tower Defense**.

Projekt je dostupný na této adrese: [https://vojtech-m-kaj.netlify.app/](https://vojtech-m-kaj.netlify.app/)

## Popis funkčnosti  

### Jak se hraje 🕹️  
- Hráč staví věže na herní mapu (grid) pomocí **kliknutí** nebo **drag & drop**.  
- Věže automaticky útočí na nepřátele v dosahu.  
- Nepřátelé se pohybují po pevně dané trase.  
- Za každého poraženého nepřítele hráč získává peníze.  
- Pokud nepřítel projde až do cíle, hráč přijde o život.  
- Hra končí, pokud hráč ztratí všechny životy.  
- Mapa, vlny a obtížnost jsou pevně nastaveny pro demonstraci mechanik.  

## Přehled částí  

| Soubor / Třída    | Popis                                                                                         |
|-------------------|-----------------------------------------------------------------------------------------------|
| `app.js`          | Hlavní skript, který inicializuje canvas, spouští herní smyčku, vlny nepřátel a obsluhuje interakce hráče. |
| `enemy.js`        | Třída `Enemy` reprezentuje nepřítele – jeho pohyb, vykreslování a logiku pro detekci cíle.     |
| `tower.js`        | Třída `Tower` – zajišťuje logiku střelby, výběr cíle a interakci s nepřáteli.                  |
| `tileMap.js`      | Třída `TileMap` vykresluje herní mapu, drží stav věží a dlaždic.                              |
| `uiElements.js`   | Správa HUD (čas, peníze, životy), přepínání mezi menu a hrou, ovládání zvuku.                  |
| `utils.js`        | Pomocné funkce – výpočet času, načtení mapy přes `fetch`, převod času apod.                    |
| `nameday.js`      | Funkce pro získání jmenin z veřejného API a jejich zobrazení v HUD.                            |
| `index.html`      | Základní HTML struktura stránky. Obsahuje canvas, menu, nastavení a skripty.                   |
| `styless.css`     | Kompletní stylování hry – rozložení, barvy, responsivita, animace, media queries.             |

## Poznámky k implementaci  

- **API pro svátky:** využito veřejné API [https://svatky.adresa.info](https://svatky.adresa.info) k zobrazení aktuálních jmenin.  
- **SVG + hlasitost:** úprava SVG ikon pro vizuální znázornění hlasitosti.  
- **Formulář:** validace uživatelského vstupu probíhá v JS (kontrola délky jména, prázdnosti).  
- **CSS pokročilé selektory:** např.  
  - `.hud button ~ p`  
  - `.menu h2 + li`  
- **Custom properties (CSS variables):** pro barvy tlačítek, hlavičky a patičky.  
- **Vendor prefixy:** např. `--moz-transition` pro přechody v menu.  
- **Canvas interaktivita:** věže lze umisťovat pomocí kliknutí i drag & drop.  
- **Assety:** všechny herní grafiky byly vytvořeny v editoru [Piskel](https://www.piskelapp.com/), ikonky jsou z [Flaticon](https://www.flaticon.com/).  
- **Intl API:** využito pro lokalizaci a zpracování času (časovač, formátování).
