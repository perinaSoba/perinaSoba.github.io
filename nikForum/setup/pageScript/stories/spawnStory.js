fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
.then(response=> response.json())
.then((storiesJson) => {
    var storyTitle = document.getElementsByTagName("META")[0].content;

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
