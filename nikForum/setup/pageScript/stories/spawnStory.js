fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
.then(response=> response.json())
.then((storiesJson) => {
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

    document.title = "Nik Forum - " + storyObject.title;
    
    document.getElementById("title").innerHTML = storyObject.title;
    document.getElementById("authImg").src = storyObject.author.profile_pic;
    document.getElementById("authName").innerHTML = storyObject.author.name;
    document.getElementById("relsDate").innerHTML = storyObject.relase_date;

    document.getElementById("artCont").innerHTML = storyObject.html_code;
});
