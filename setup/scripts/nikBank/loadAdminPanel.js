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

    if (userBody.email == `petarnikolic1512@gmail.com`) {
        fetch('https://dev--nikbank--perinasoba.autocode.dev/userData?useOfData=read')
        .then(response=> response.json())
        .then((allUsers) => {
            document.getElementById(`jasminaBalance`).innerHTML = `${allUsers[0].balance}rsd`;
            document.getElementById(`jasminaTransactions`).innerHTML = allUsers[0].transactions.replace(/,/g, `<br>`);

            document.getElementById(`miomirBalance`).innerHTML = `${allUsers[1].balance}rsd`;
            document.getElementById(`miomirTransactions`).innerHTML = allUsers[1].transactions.replace(/,/g, `<br>`);
        })
    } else {
        document.getElementById(`dataHolder`).style.display = `none`; 
    }
  
} else {
    document.getElementById(`dataHolder`).style.display = `none`; 
}