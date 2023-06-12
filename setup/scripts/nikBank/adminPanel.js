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
    const userBody = decodeJwtResponse(getCookie(`userCode`));

    var userList;

    if (userBody.email == `petarnikolic1512@gmail.com`) {
        fetch('https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=read')
        .then(response=> response.json())
        .then((allUsers) => {
            document.getElementById(`jasminaBalance`).innerHTML = `${allUsers[0].balance}rsd`;

            userList = allUsers;

            var repeatNum = 0;
            while (repeatNum != allUsers[0].transactions.length) {
                repeatNum++;
                var i = repeatNum-1;

                var tempDiv = document.getElementById('jasminaTransactions');
                var tempP = document.createElement('p');
                tempP.setAttribute("onclick", "removeTransObject(" + i + ", 0" + ")");
                tempP.innerHTML = allUsers[0].transactions[i];

                tempDiv.appendChild(tempP);
            }

            document.getElementById(`miomirBalance`).innerHTML = `${allUsers[1].balance}rsd`;

            var repeatNum1 = 0;
            while (repeatNum1 != allUsers[1].transactions.length) {
                repeatNum1++;
                var i = repeatNum1-1;

                var tempDiv = document.getElementById('miomirTransactions');
                var tempP = document.createElement('p');
                tempP.innerHTML = allUsers[1].transactions[i];
                tempP.setAttribute("onclick", "removeTransObject(" + i + ", 1" + ")");

                tempDiv.appendChild(tempP);
            }
        })
    } else {
        document.getElementById(`dataHolder`).style.display = `none`; 
    }
  
} else {
    document.getElementById(`dataHolder`).style.display = `none`; 
}

function removeTransObject(arrayNum, recUser) {
    if (confirm("Da li ste sigurni da želite da obrišete ovu transakciju?")) {
        userList[recUser].transactions = userList[recUser].transactions.splice(0, arrayNum);

        fetch(`https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=write&data=${encodeURIComponent(JSON.stringify(userList))}`)
        .then(response=> response.json())
        .then((writeResponse) => {
            alert(writeResponse);

            location.reload();
        });
    }
}