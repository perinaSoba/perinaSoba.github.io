// Cookies
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Jwt decoder
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

if (getCookie(`userCode`) != null) {
    // Decode the credential response
    const responsePayload = decodeJwtResponse(getCookie(`userCode`));

    document.getElementById("mobLogInDiv").src = responsePayload.picture;
    document.getElementById("mobLogInDiv").onclick = function() {window.location.href = `https://perinasoba.github.io/nalog`};
    document.getElementById("mobLogInDiv").title = null;
}

function buttPressed() {
    if (window.getComputedStyle(document.getElementById("mobileNav"), null).display == "none") {
        document.getElementById("mobileNav").style.display = "block";
        document.getElementById("mobNavButt").style.background = "transparent";
        document.getElementById("mobLogInDiv").style.display = "none";
    } else if (window.getComputedStyle(document.getElementById("mobileNav"), null).display == "block") {
        document.getElementById("mobileNav").style.display = "none";
        document.getElementById("mobNavButt").style.background = "#fff";
        document.getElementById("mobLogInDiv").style.display = "block";
    }
}