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

if (getCookie(`userCode`) != null) {
    // Load user data
    fetch('https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=read')
    .then(response=> response.json())
    .then((allUsers) => {
        const responsePayload = decodeJwtResponse(getCookie(`userCode`));

        document.getElementById(`googleImage`).src = `${responsePayload.picture}`;

        var usersArray = allUsers.filter(function (el) {
            return responsePayload.email == el.emails[0];
        });

        document.getElementById(`name`).innerText = `${responsePayload.name}`;
        document.getElementById(`e-mail`).innerText = `${responsePayload.email}`;

        if (JSON.stringify(usersArray) == `[]`) {
            document.getElementById(`dataHolder`).style.display = `block`;
            document.getElementById(`aboutUser`).style.display = `block`;

            document.getElementById(`transDiv`).style.display = `none`;
            document.getElementById(`cards`).style.display = `none`;
            document.getElementById(`balance`).style.display = `none`;
            document.getElementById(`spaceLine`).style.display = `none`;
            document.getElementById(`birthYear`).parentElement.style.display = `none`;
            document.getElementById(`address`).parentElement.style.display = `none`;
        } else {
            var userObject = usersArray[0];
            var numberOfTrans = userObject.transactions.length;

            document.getElementById(`balance`).innerText = `Stanje računa: ${userObject.balance}rsd`;
                    
            var repeatNum = 0;
            while (repeatNum != numberOfTrans) {
                var transDiv = document.getElementById('transDiv');
                var tempspan = document.createElement('span');

                var tempspace = document.createElement('br');
                var tempspace1 = document.createElement('br');
                tempspan.innerHTML = `${userObject.transactions[repeatNum]}`;
                
                transDiv.appendChild(tempspace);
                transDiv.appendChild(tempspace1);
                transDiv.appendChild(tempspan);

                repeatNum++;
            }

            document.getElementById(`cardNum`).innerText = `XXXX XXXX XXXX ${userObject.creditCard.cardNumber.slice(-4)}`;
            document.getElementById(`validThruCard`).innerText = `${userObject.creditCard.validThru}`;
            document.getElementById(`cvvCard`).innerText = `${userObject.creditCard.CVV}`;

            document.getElementById(`birthYear`).innerText = `${userObject.bithday}`;
            document.getElementById(`address`).innerText = `${userObject.location}`;

            document.getElementById(`dataHolder`).style.display = `block`;
            document.getElementById(`aboutUser`).style.display = `block`; 
        }

        document.getElementById(`infoDiv`).style.display = `none`; 
    });
} else {
    document.getElementById(`infoDiv`).style.display = `block`; 
}