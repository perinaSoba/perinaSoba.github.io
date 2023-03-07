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

// Procces of creating new page
function createNewPage() {
    if (getCookie(`userCode`) == null) {
        google.accounts.id.initialize({
            client_id: '117118612983-7kq88fbtij8h4jlno2chui9gu37oqidg.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });

        google.accounts.id.prompt();

        alert("Morate da budete ulogovani na vaš Google nalog kako biste mogli da obljavite ovu priču.");
    } else if (getCookie(`userCode`) != null) {
        const userInfo = decodeJwtResponse(getCookie(`userCode`).credential);

        var storieTitle = document.getElementById("data_title").innerText;
        var storieContent = document.getElementById("data_content").innerText;
        var storieShortContent = `${storieContent.slice(0, 300)}`;

        var authName = userInfo.given_name;
        var authEmail = userInfo.email;
        var authProfilePic = userInfo.picture;


        fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
        .then(response=> response.json())
        .then((storiesJson) => {
            var title = `${storieTitle}`;
            var content = `${storieContent}`;

            var newObject = JSON.parse({
                "title": `${title}`,
                "author": {
                    "name": `${authName}`,
                    "email": `${authEmail}`,
                    "profile_pic": `${authProfilePic}`
                },
                "short_text": `${storieShortContent}`,
                "full_text": `${content}`
            });
            storiesJson.unshift(newObject);

            console.log(storiesJson);
        });
    }
}