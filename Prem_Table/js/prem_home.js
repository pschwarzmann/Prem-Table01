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
