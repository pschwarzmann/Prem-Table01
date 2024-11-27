window.onscroll = function() {
    checkScroll();
  };
  
  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop - 70; // Die 70px vom oberen Rand berücksichtigen
  
  function checkScroll() {
    if (window.pageYOffset > sticky) {
      navbar.classList.add("sticky"); // Füge die Klasse sticky hinzu
      navbar.style.position = "fixed"; // Fixiere die Bar oben
      navbar.style.top = "0"; // Setze die Bar direkt an den oberen Rand
    } else {
      navbar.classList.remove("sticky"); // Entferne die Klasse sticky
      navbar.style.position = "relative"; // Setze die Bar zurück an ihre ursprüngliche Position
      navbar.style.top = "70px"; // Abstand von 70px
    }
  }
  

  async function fetchPremierLeagueTable() {
    const tableBody = document.querySelector("#league-table tbody");
    const apiUrl = "https://api.openligadb.de/getbltable/pl1/2023";
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Begrenze die Tabelle auf 20 Teams
      const teams = data.slice(0, 20);
  
      // Tabelle leeren
      tableBody.innerHTML = "";
  
      // Durch alle Teams gehen und Zeilen erstellen
      teams.forEach((team, index) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${index + 1}</td>                      <!-- Position -->
          <td><img src="${team.teamIconUrl}" alt="${team.teamName}" width="50" height="50"> ${team.teamName}</td>                   <!-- Teamname -->
          <td>${team.matches}</td>               <!-- Spiele -->
          <td>${team.won}</td>                       <!-- Siege -->
          <td>${team.draw}</td>                      <!-- Unentschieden -->
          <td>${team.lost}</td>                      <!-- Niederlagen -->
          <td>${team.goals}</td>                     <!-- Tore -->
          <td>${team.opponentGoals}</td>            <!-- Tordifferenz -->
          <td>${team.goalDiff}</td>                    <!-- Punkte -->
          <td>${team.LastMatch || "N/A"}</td>        <!-- Letztes Spiel -->
        `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Tabelle:", error);
      tableBody.innerHTML = `<tr><td colspan="11">Fehler beim Laden der Tabelle</td></tr>`;
    }
  }
  
  // Funktion wird aufgerufen, wenn die Seite geladen ist
  window.onload = fetchPremierLeagueTable;
  