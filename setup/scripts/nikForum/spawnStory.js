fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
.then(response=> response.json())
.then((storiesJson) => {
    /* Spawn story */
    function spawnStory() {
        document.title = "Nik Forum - " + storyObject.title;
    
        document.getElementById("title").innerHTML = storyObject.title;
        document.getElementById("authImg").src = storyObject.author.profile_pic;
        document.getElementById("authName").innerHTML = storyObject.author.name;
        document.getElementById("relsDate").innerHTML = storyObject.relase_date;

        document.getElementById("artCont").innerHTML = storyObject.html_code;
    }

    /* Google block */
    var loadOtherStories = true;
    function showError(reason, urlEnd) {
        openPopUp(`["${reason}", "Greška", "https://perinasoba.github.io/${urlEnd}"]`, -2)
        loadOtherStories = false;

        document.getElementById(`currStory`).style.display = `none`;
        document.getElementById(`otherStories`).style.display = `none`;
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

    if (storyObject == undefined) {
        loadOtherStories = false;
        showError(`Ova priča ne postoji, ili je došlo do neke nepoznate greške`, `nikForum`);
    } else if (storyObject.public == true) {
        spawnStory()
    } else if (storyObject.public == false) {
        if (getCookie(`userCode`) != null) {
            // Decode the credential response
            const responsePayload = decodeJwtResponse(getCookie(`userCode`));

            if (responsePayload.email == "petarnikolic1512@gmail.com" || responsePayload.email == "postbgd@gmail.com" || responsePayload.email == "perinasoba@gmail.com" || responsePayload.email == "jamiko1512@gmail.com" || responsePayload.email == "jasmina.nikolic@tenfore.net" || responsePayload.email == "miomirnikolic61@gmail.com") {
                spawnStory()
            } else {
                showError(`Ova priča je dostupna samo korisnicima koji su se ulogovali na svoj Google nalog. Ukoliko ste se već ulogovali a i dalje vidite ovu poruku reloadujte ovu stranicu par puta`, `nalog`);
            }
        } else {
            showError(`Ova priča je dostupna samo korisnicima koji su se ulogovali na svoj Google nalog. Ukoliko ste se već ulogovali a i dalje vidite ovu poruku reloadujte ovu stranicu par puta`, `nalog`);
        }
    }

    /* Load side stories */
    if (loadOtherStories) {
        var repeatNum = 0;
        while (repeatNum != 3) {
            repeatNum++;
            var i = repeatNum-1;
    
            // On page material
            var otherStoriesDiv = document.getElementById('otherStories');
            // Main div
            var tempDiv = document.createElement('div');
            // Image
            var tempImg = document.createElement('img');
            // Info
            var tempSpan = document.createElement('span');
            // About
            var tempP = document.createElement('p');
    
            // Set element data
            tempP.innerText = storiesJson[i].short_text;
            tempSpan.innerText = `${storiesJson[i].author.name} • ${storiesJson[i].short_relase_date}`;
    
            // On Click function
            tempDiv.setAttribute("onclick", `window.location.href = \`${storiesJson[i].url}\``);
            tempDiv.classList.add(`onSurfaceBorderElement`);
            tempSpan.classList.add(`fontSubHeading`);
            tempP.classList.add(`fontText`);
            tempImg.setAttribute("src", `${storiesJson[i].image_url}`);
    
            // Set elemnts location
            otherStoriesDiv.appendChild(tempDiv);
            tempDiv.appendChild(tempImg);
            tempDiv.appendChild(tempSpan);
            tempDiv.appendChild(tempP);
        }
    }
});
