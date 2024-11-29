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
          <td>${index + 1}</td> <!-- Platz -->
          <td><img src="${team.teamIconUrl}" alt="${team.teamName}"  height="100" width="auto"><td>
          <td>${team.teamName || 0}</td>
          <td>${team.matches || 0}</td>
          <td>${team.won || 0}</td>
          <td>${team.draw || 0}</td>
          <td>${team.lost || 0}</td>
          <td>${team.goals || 0}</td>
          <td>${team.opponentGoals || 0}</td>
          <td>${team.points || 0}</td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fehler beim Laden der Daten:", error);
    });
});
