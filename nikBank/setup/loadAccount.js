// Get all stories
fetch('https://perinasoba.github.io/nikBank/users.json')
.then(response=> response.json())
.then((allUsers) => {
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
        const responsePayload = decodeJwtResponse(getCookie(`userCode`));

        document.getElementById(`googleImage`).src = `${responsePayload.picture}`;
        
        var usersArray
        try {
            usersArray = allUsers.filter(function (el) {
                return responsePayload.email == el.emails[0];
            });
        } catch(e) {
            document.getElementById(`errorMsg`).innerText = `Google nalog na koji ste se prijavili nije povezan ni sa jednim Nik Bank nalogom.`;
        }
        
        var userObject = usersArray[0];
        var numberOfTrans = userObject.transactions.length();

        document.getElementById(`name`).innerText = `${userObject.nameAndSurname}`;
        document.getElementById(`balance`).innerText = `Stanje računa: ${userObject.balance}`;
        
        var repeatNum = 0;
        while (repeatNum != numberOfTrans) {
            var transDiv = document.getElementById('transDiv');
            var tempspan = document.createElement('span');
            tempspan.innerHTML = `${userObject.transactions[repeatNum]}`;
            transDiv.appendChild(tempspan);

            repeatNum++;
        }

        document.getElementById(`birthYear`).innerText = `${userObject.bithday}`;
        document.getElementById(`address`).innerText = `${userObject.location}`;
        document.getElementById(`e-mail`).innerText = `${userObject.emails[0]}`;

        document.getElementById(`loggedInDiv`).style.display = `block`;
        document.getElementById(`accountInfo`).style.display = `block`;
        document.getElementById(`errorDiv`).style.display = `none`;
    } else {
        document.getElementById(`errorMsg`).innerHTML = `Molimo ulogujte se na vaš Google nalog kako bi ste videli vaš Nik Bank nalog. Više informacija o tome kako da se ulogujete pogledajte na <a href="https://perinaSoba.github.io/nalog" target="_blank">kartici nalog</a>.`;
    }
})