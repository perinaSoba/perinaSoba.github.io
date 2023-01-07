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

// Buy phone
function buyPhone(price, model) {
    document.getElementById("buyButt").onclick = function() {alert(`Obrađuje se...`)};

    if (getCookie(`userCode`) != null) { 
        const responsePayload = decodeJwtResponse(getCookie(`userCode`));

        var name = responsePayload.given_name;
        var email = responsePayload.email;

        var requestURL = `https://perinasoba.autocode.dev/purchase@dev/nikMagicPhone?name=${name}&email=${email}&price=${price}&model=${model}`
        fetch(requestURL)
        .then(response=> response.json())
        .then((rsp) => {
            if (rsp.done == true) {
                alert(`Uspešna kupovina, proverite vaš e-mail ${email}.`);
            } else {
                alert(`Desila se neka greška, molimo pokušajte kasnije.`)
            }
        })
    } else {
        alert(`Potrebno je da se ulogujete kako bi ste izvršili ovu kupovinu.`)
    }

    document.getElementById("buyButt").onclick = function() {alert(`Već ste kupili ovaj proizvod.`)};
}