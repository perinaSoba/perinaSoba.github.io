// Jwt decoder
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Cookie functions
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
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

function newPageAdmin() {
    var userCode = getCookie(`userCode`);

    if (getCookie(`userCode`) != null) {
        var userInfo = decodeJwtResponse(userCode);

        if (userInfo.email == "petarnikolic1512@gmail.com" || userInfo.email == "postbgd@gmail.com" || userInfo.email == "perinasoba@gmail.com") {
            window.location.href = `https://perinasoba.github.io/nikForum/novo`;
        } else {
            alert("Ova opcija nije trenutno dostupna.");
        }
    } else {
        alert("Da bi ste koristili ovu opciju morate da se ulogujete.");
    }
}