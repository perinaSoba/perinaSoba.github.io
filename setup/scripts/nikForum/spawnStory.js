fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
.then(response=> response.json())
.then((storiesJson) => {
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

    /* Spawn story */
    function spawnStory() {
        document.title = "Nik Forum - " + storyObject.title;
    
        document.getElementById("title").innerHTML = storyObject.title;
        document.getElementById("authImg").src = storyObject.author.profile_pic;
        document.getElementById("authName").innerHTML = storyObject.author.name;
        document.getElementById("relsDate").innerHTML = storyObject.relase_date;

        document.getElementById("artCont").innerHTML = storyObject.html_code;
        document.getElementById("errorDiv").style.display = "none";
    }

    /* Google block */
    function googleBlock() {
        document.getElementById("artCont").style.display = "none";
        document.getElementById("storiesInfo").style.display = "none";
                
        document.getElementById("errorDiv").style.display = "block";
    }

    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

        if (query === url || query === "") return;

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        } 
        return parms;
    };

    var urlData = parseURLParams(`${document.location.href}`);

    var storyTitle = urlData.id[0];

    var storyArray = storiesJson.filter(function (el) {
        return el.title ==  storyTitle;
    });

    var storyObject = storyArray[0];

    if (storyObject.public == true) {
        spawnStory()
    } else if (storyObject.public == false) {
        if (getCookie(`userCode`) != null) {
            // Decode the credential response
            const responsePayload = decodeJwtResponse(getCookie(`userCode`));

            if (responsePayload.email == "petarnikolic1512@gmail.com" || responsePayload.email == "postbgd@gmail.com" || responsePayload.email == "perinasoba@gmail.com" || responsePayload.email == "jamiko1512@gmail.com" || responsePayload.email == "jasmina.nikolic@tenfore.net" || responsePayload.email == "miomirnikolic61@gmail.com") {
                spawnStory()
            } else {
                googleBlock()
            }
        } else {
            googleBlock()
        }
    }
});
