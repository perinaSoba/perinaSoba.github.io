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

// Jwt decoder
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Functions
function editData(rP) {
    document.getElementById("userInfoCard").style.display = "flex";
    document.getElementById("logInDiv").style.display = "none";
    document.getElementById("userImage").src = rP.picture;
}
function accountEdit(rP) {
    document.getElementById("onPageUserInfoCard").style.display = "block";
    document.getElementById("errorDiv").style.display = "none";
    document.getElementById("logOutButton").style.display = "flex";
    document.getElementById("logOutButton").style.justifyContent = "right";
    document.getElementById("onPageUserImage").src = rP.picture;
    document.getElementById("onPageUsersName").innerHTML = rP.given_name;
    document.getElementById("onPageUsersMail").innerHTML = rP.email;
}

// Google sign in response function
function handleCredentialResponse(response) {
    // Decode the credential response
    const responsePayload = decodeJwtResponse(response.credential);

    // Set info visible to end user
    editData(responsePayload);

    // Set info on account page
    if (window.location.href == "https://perinasoba.github.io/nikForum/nalog") {
        accountEdit(responsePayload);
    };

    setCookie(`userCode`, `${response.credential}`, 7);
}

// Reopen page
function reopenOneTap() {
    document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    google.accounts.id.initialize({
        client_id: '117118612983-7kq88fbtij8h4jlno2chui9gu37oqidg.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt();
}

// Check if user alredy loged in
if (getCookie(`userCode`) != null) {
    // Decode the credential response
    const responsePayload = decodeJwtResponse(getCookie(`userCode`));

    // Set info visible to end user
    editData(responsePayload);

    // Set info on account page
    if (window.location.href == "https://perinasoba.github.io/nikForum/nalog") {
        accountEdit(responsePayload);
    }
}

// Log out function
function logOutButtonPress() {
    if(confirm('Da li ste sigurni da želite da se izlogujete?')) {
        document.cookie = "userCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.location.reload()
    }
}
