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

function buyElectronics(modelName) {
    var price;

    if (modelName == `Lego Mini`) {
        price = 1500;
    } else if (modelName == `Lego I`) {
        price = 2000;
    } else if (modelName == `Lego I Pro`) {
        price = 5000;
    } else if (modelName == `Lego Watch`) {
        price = 3000;
    } else if (modelName == `Lego Book`) {
        price = 5000;
    } else if (modelName == `test`) {
        price = 10;
    }

    if (getCookie(`userCode`) != null) { 
        const userInformation = decodeJwtResponse(getCookie(`userCode`));

        var name = userInformation.given_name;
        var email = userInformation.email;

        if (confirm(`Sa vašeg računa će biti skinut iznos od ${price} dinara. Da li ste sigurni?`) == true) {
            fetch(`https://dev--nikbank--perinasoba.autocode.dev/purchase?name=${name}&email=${email}&price=${price}&modelName=${modelName}`)
            .then(response=> response.json())
            .then((rsp) => {
                if (rsp == `success`) {
                    alert(`Uspešna kupovina, proverite vaš e-mail ${email}.`);
                } else if (rsp == `no_money`) {
                    alert(`Nemate dovoljno sredstava na vašem računu.`);
                } else if (rsp == `no_account`) {
                    alert(`Da bi ste završili transakciju potreban vam je Nik Bank nalog.`);
                } else {
                    alert(`Desila se nepoznata greška. Molimo pokušajte ponovo kasnije.`);
                }
            })
        } else {
            alert(`Kupovina obustavljena. Iznos na vašem računu je ostao nepromenjen.`)
        }
    } else {
        alert(`Potrebno je da se ulogujete kako bi izvršili kupovinu ${modelName}.`)
    }
}

function donateToOrg(orgName, amount) {
    if (getCookie(`userCode`) != null) { 
        const userInformation = decodeJwtResponse(getCookie(`userCode`));
        
        var email = userInformation.email;

        if (confirm(`Sa vašeg računa će biti skinut iznos od ${amount} dinara. Da li ste sigurni?`) == true) {
            fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
                .then(response=> response.json())
                .then((userData) => { 

                });


            fetch(`https://dev--nikbank--perinasoba.autocode.dev/donation?email=${email}&amount=${amount}&orgName=${orgName}`)
            .then(response=> response.json())
            .then((rsp) => {
                if (rsp == `success`) {
                    alert(`Uspešno ste donirali.`);
                } else if (rsp == `no_money`) {
                    alert(`Nemate dovoljno sredstava na vašem računu.`);
                } else if (rsp == `no_account`) {
                    alert(`Da bi ste završili transakciju potreban vam je Nik Bank nalog.`);
                } else {
                    alert(`Desila se nepoznata greška. Molimo pokušajte ponovo kasnije.`);
                }
            })
        } else {
            alert(`Doniranje obustavljeno. Iznos na vašem računu je ostao nepromenjen.`)
        }
    } else {
        alert(`Potrebno je da se ulogujete kako bi ste donirali organizaciji ${orgName}.`)
    }
}