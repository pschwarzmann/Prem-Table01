window.onload=alert("Hier kommt Steini!!")


function touchStein () {
    let UserName = promt ("Wie lautet dein Name?","Gib deinen Namen ein:");
    console.log("Hier ist der Username: " + UserName)
    if (UserName) {
        alert("Es ist gut sie zu treffen, " + UserName + ".");
        document.getElementById("steinimg").src="../images/happy.png";
    }
}