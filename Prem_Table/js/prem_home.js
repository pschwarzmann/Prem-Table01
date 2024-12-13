window.onscroll = function() {
  checkScroll();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop - 70; // Die 70px vom oberen Rand berücksichtigen

function checkScroll() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky"); 
    navbar.style.position = "fixed";
    navbar.style.top = "0";
  } else {
    navbar.classList.remove("sticky");
    navbar.style.position = "relative";
    navbar.style.top = "70px"; 
  }
}

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