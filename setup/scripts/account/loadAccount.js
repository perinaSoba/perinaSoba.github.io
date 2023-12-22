// Hide infoDiv
document.getElementById(`infoDiv`).style.display = `none`; 

// Cookie functions
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


function changeElements(typeOfUse) {
    document.getElementById(`transDiv`).style.display = `${typeOfUse}`;
    document.getElementById(`cards`).style.display = `${typeOfUse}`;
    document.getElementById(`balance`).style.display = `${typeOfUse}`;
    document.getElementById(`spaceLine`).style.display = `${typeOfUse}`;
    document.getElementById(`birthYear`).parentElement.style.display = `${typeOfUse}`;
    document.getElementById(`address`).parentElement.style.display = `${typeOfUse}`;
}

function goToBillPage(eID) {
    window.open("https://perinasoba.github.io/fiskalizacija?eID=" + eID, "_blank");
}

if (getCookie(`userCode`) != null) {
    const responsePayload = decodeJwtResponse(getCookie(`userCode`));

    document.getElementById(`name`).innerText = `${responsePayload.name}`;
    document.getElementById(`e-mail`).innerText = `${responsePayload.email}`;
    document.getElementById(`googleImage`).src = `${responsePayload.picture}`;

    document.getElementById(`dataHolder`).style.display = `block`;
    document.getElementById(`aboutUser`).style.display = `block`;
    document.getElementById(`infoDiv`).style.display = `none`; 

    changeElements(`none`);

    // Load user data
    fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
    .then(response=> response.json())
    .then((allUsers) => {
        var usersArray = allUsers.filter(function (el) {
            return responsePayload.email == el.emails[0];
        });

        if (JSON.stringify(usersArray) != `[]`) {
            var userObject = usersArray[0];
            var numberOfTrans = userObject.transactions.length;

            document.getElementById(`balance`).innerText = `Stanje računa: ${userObject.balance}rsd`;
                    
            fetch('https://json.extendsclass.com/bin/987bd36c8663')
            .then(response => response.json())
            .then((allTransData) => {
                var repeatNum = 0;
                while (repeatNum != numberOfTrans) {
                    var transDiv = document.getElementById('transDiv');
                    var tempspan = document.createElement('span');

                    var tempspace = document.createElement('br');

                    var tempTrans = allTransData.filter(function (el) {return el.eID == userObject.transactions[repeatNum];});
                    
                    tempspan.innerHTML = `${tempTrans[0].vreme} | x${tempTrans[0].artikli[0].kolicina} | ${-tempTrans[0].artikli[0].komadCena} rsd | ${tempTrans[0].artikli[0].imeArtikla}`;
                    tempspan.classList.add(`onSurfaceContainer`);
                    tempspan.setAttribute("onclick", "goToBillPage(" + tempTrans[0].eID + ")");
                    
                    transDiv.appendChild(tempspace);
                    transDiv.appendChild(tempspan);

                    repeatNum++;
                }
            });

            changeElements(`block`);

            document.getElementById(`cardNum`).innerText = `XXXX XXXX XXXX ${userObject.creditCard.cardNumber.slice(-4)}`;
            document.getElementById(`validThruCard`).innerText = `${userObject.creditCard.validThru}`;
            document.getElementById(`cvvCard`).innerText = `${userObject.creditCard.CVV}`;

            document.getElementById(`birthYear`).innerText = `${userObject.bithday}`;
            document.getElementById(`address`).innerText = `${userObject.location}`;
        }
    });
} else {
    document.getElementById(`infoDiv`).style.display = `block`; 
}