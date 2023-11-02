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

document.getElementById(`newTransHolder`).style.display = `none`;
document.getElementById(`userDataHolder`).style.display = `none`;

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

            document.getElementById(`newTransHolder`).style.display = `block`;
            document.getElementById(`userDataHolder`).style.display = `flex`;
        })
    }
} 

function removeTransObject(arrayNum, recUser) {
    if (confirm("Da li ste sigurni da želite da obrišete ovu transakciju?")) {
        userList[recUser].transactions = userList[recUser].transactions.splice(arrayNum, 1);

        fetch(`https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=write&data=${encodeURIComponent(JSON.stringify(userList))}`)
        .then(response=> response.json())
        .then((writeResponse) => {
            alert(writeResponse);

            location.reload();
        });
    }
}

function addNewTrans() {
    if (confirm("Da li ste sigurni da želite da dodate transakciju?")) {
        var userId = parseInt(document.getElementById(`personPicker`).value);

        var newTransDate = document.getElementById(`newTransDate`).value;
        var newTransMoney = parseInt(document.getElementById(`newTransMoney`).value);
        var newTransQuantity = parseInt(document.getElementById(`newTransQuantity`).value);
        var newTransName = document.getElementById(`newTransName`).value;

        userList[userId].balance = userList[userId].balance + newTransMoney*newTransQuantity;
        userList[userId].transactions.unshift(`${newTransDate} | ${newTransMoney}rsd | x${newTransQuantity} | ${newTransName}`);

        fetch(`https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=write&data=${encodeURIComponent(JSON.stringify(userList))}`)
        .then(response=> response.json())
        .then((writeResponse) => {
            alert(writeResponse);

            location.reload();
        });
    }
}