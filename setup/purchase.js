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
        
        var email = userInformation.email;

        if (confirm(`Sa vašeg računa će biti skinut iznos od ${price} dinara. Da li ste sigurni?`) == true) {
            fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
            .then(response=> response.json())
            .then((userData) => { 
                var arrNum = userData.findIndex(el => el.emails[0] == email);
  
                if (arrNum != -1) {
                    userData[arrNum].balance = (userData[arrNum].balance)-price;
                    
                    let dayInMonth = new Date().getDate();
                    if (dayInMonth.toString().length == 1) {
                        dayInMonth = `0${dayInMonth}`
                    }
                    
                    let monthNum = (new Date().getMonth())+1;
                    if (monthNum.toString().length == 1) {
                        monthNum = `0${monthNum}`
                    }
                    
                    userData[arrNum].transactions.unshift(`${dayInMonth}/${monthNum} | -${price}rsd | x1 | Perina Soba - Kupovina ${modelName}`);
                    
                    fetch(`https://json.extendsclass.com/bin/90aa08ae7a2e`, {
                        method: 'PUT',
                        headers: {
                            'Security-key': 'perinaSoba'
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(response=> response.json())
                    .then((response) => {
                        if (response.status == 0) {
                            alert(`Uspešna kupovina.`);
                        } else {
                            alert(`Greška.`);
                        }
                    });
                } else {
                    alert(`Da bi ste donirali morate da imate Nik Bank nalog.`);
                }
            });
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
                var arrNum = userData.findIndex(el => el.emails[0] == email);
                
                if (arrNum != -1) {
                    userData[arrNum].balance = (userData[arrNum].balance)-amount;
                    
                    let dayInMonth = new Date().getDate();
                    if (dayInMonth.toString().length == 1) {
                        dayInMonth = `0${dayInMonth}`
                    }
                    
                    let monthNum = (new Date().getMonth())+1;
                    if (monthNum.toString().length == 1) {
                        monthNum = `0${monthNum}`
                    }
                    
                    userData[arrNum].transactions.unshift(`${dayInMonth}/${monthNum} | -${amount}rsd | x1 | Nik Bank - Donacija organizaciji ${orgName}`);
                    
                    fetch(`https://json.extendsclass.com/bin/90aa08ae7a2e`, {
                        method: 'PUT',
                        headers: {
                            'Security-key': 'perinaSoba'
                        },
                        body: JSON.stringify(userData)
                    })
                    .then(response=> response.json())
                    .then((response) => {
                        if (response.status == 0) {
                            alert(`Uspešno ste donirali.`);
                        } else {
                            alert(`Greška.`);
                        }
                        
                    });
                } else {
                    alert(`Da bi ste donirali morate da imate Nik Bank nalog.`);
                }
            });
        } else {
            alert(`Doniranje obustavljeno. Iznos na vašem računu je ostao nepromenjen.`)
        }
    } else {
        alert(`Potrebno je da se ulogujete kako bi ste donirali organizaciji ${orgName}.`)
    }
}