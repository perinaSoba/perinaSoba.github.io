function buttPressed() {
    if (window.getComputedStyle(document.getElementById("mobileNav"), null).display == "none") {
        document.getElementById("mobileNav").style.display = "block";
        document.getElementById("mobNavButt").style.background = "transparent";
        document.getElementById("movLogInDiv").style.display = "none";
    } else if (window.getComputedStyle(document.getElementById("mobileNav"), null).display == "block") {
        document.getElementById("mobileNav").style.display = "none";
        document.getElementById("mobNavButt").style.background = "#fff";
        document.getElementById("movLogInDiv").style.display = "block";
    }
}