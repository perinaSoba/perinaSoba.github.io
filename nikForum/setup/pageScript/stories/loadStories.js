// Get all stories
fetch('https://perinasoba.github.io/nikForum/setup/stories.json')
.then(response=> response.json())
.then((storiesJson) => {
    // Check how much object are in stories array 
    var objectsInArray = 0;
    var errorWithNum = false;

    while (errorWithNum == false) {
        objectsInArray++;
        try {
            let emptyText = storiesJson[objectsInArray].title;
        } catch(e) {
            errorWithNum = true;
        }
    }

    var repeatNum = 0;
    while (repeatNum != objectsInArray) {
        repeatNum++;
        var i = repeatNum-1;

        // On page material
        var storiesContainerDiv = document.getElementById('storiesContainer');
        // Main div
        var tempDiv = document.createElement('div');
        // Image
        var tempImg = document.createElement('img');
        // Title
        var tempTitle = document.createElement('h4');
        // Author info
        /*var tempAuthDiv = document.createElement('div');
        var tempAuthImg = document.createElement('img');
        var tempAuthName = document.createElement('p');*/
        // Short text
        var tempShortText = document.createElement('p');

        // Set element data
        tempTitle.innerHTML = storiesJson[i].title;
        tempImg.src = storiesJson[i].image_url;
        /*tempAuthDiv.classList.add('storiesAuthor');
        tempAuthImg.src = storiesJson[i].author.profile_pic;
        tempAuthName.innerHTML = storiesJson[i].author.name + " • " + storiesJson[i].short_relase_date;*/
        tempShortText.innerHTML = storiesJson[i].short_text;

        // On Click function
        tempDiv.setAttribute("onclick", "window.location.href = `" + storiesJson[i].url + "`");

        // Set elemnts location
        storiesContainerDiv.appendChild(tempDiv);
        tempDiv.appendChild(tempImg);
        tempDiv.appendChild(tempTitle);
        /*tempDiv.appendChild(tempAuthDiv);
        tempAuthDiv.appendChild(tempAuthImg);
        tempAuthDiv.appendChild(tempAuthName);*/
        tempDiv.appendChild(tempShortText);
    }
});
