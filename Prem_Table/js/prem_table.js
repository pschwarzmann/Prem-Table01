document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.openligadb.de/getbltable/ucl2024/2024";
  const tableBody = document.querySelector("#league-table tbody");

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error("Unerwartetes Datenformat:", data);
        return;
      }

      // Sortieren nach Punkten, Tordifferenz, und geschossenen Toren
      const sortedData = data.sort((a, b) => {
        const goalDiffA = a.Goals - a.OpponentGoals;
        const goalDiffB = b.Goals - b.OpponentGoals;

        if (b.Points !== a.Points) {
          return b.Points - a.Points; // Nach Punkten absteigend
        } else if (goalDiffB !== goalDiffA) {
          return goalDiffB - goalDiffA; // Nach Tordifferenz absteigend
        } else {
          return b.Goals - a.Goals; // Nach geschossenen Toren absteigend
        }
      });

      // Tabelle generieren
      sortedData.forEach((team, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
         <td class="position-column">
            <span class="position-number">${index + 1}</span>
            <span class="position-dot">•</span>
          </td>
          <td class="club-cell">
            <div class="club-logo-container">
              <img src="${team.teamIconUrl}" alt="${"Bild konnte nicht geladen werden"}" class="club-logo">
            </div>
            <div class="club-name">
              <span>${team.teamName}</span>
            </div>
          </td>
          <td>${team.matches}</td>
          <td>${team.won}</td>
          <td>${team.draw}</td>
          <td>${team.lost}</td>
          <td>${team.goals}</td>
          <td>${team.opponentGoals}</td>
          <td class="points-column">${team.points}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fehler beim Laden der Daten:", error);
    });
});

// Beispielwerte
const testValue = {
  name: "TestUser",
  id: 12345
};


localStorage.setItem("localTest", JSON.stringify(testValue));


sessionStorage.setItem("sessionTest", JSON.stringify(testValue));


const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};
setCookie("cookieTest", JSON.stringify(testValue), 7);

// Testen der gespeicherten Werte
console.log("Local Storage:", localStorage.getItem("localTest"));
console.log("Session Storage:", sessionStorage.getItem("sessionTest"));
console.log("Cookies:", document.cookie);