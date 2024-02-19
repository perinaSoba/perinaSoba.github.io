document.getElementById(`newTransHolder`).style.display = `none`;
document.getElementById(`userDataHolder`).style.display = `none`;

if (getCookie(`userCode`) != null) {
    const userBody = decodeJwtResponse(getCookie(`userCode`));

    if (userBody.email == `petarnikolic1512@gmail.com`) {
        fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
        .then(response=> response.json())
        .then((allUsers) => {
            document.getElementById(`jasminaBalance`).innerHTML = `${allUsers[0].balance}rsd`;

            fetch('https://json.extendsclass.com/bin/987bd36c8663')
            .then(response => response.json())
            .then((allTransData) => {
                var repeatNum = 0;
                while (repeatNum != allUsers[0].transactions.length) {
                    repeatNum++;
                    var i = repeatNum-1;

                    var tempDiv = document.getElementById('jasminaTransactions');
                    var tempP = document.createElement('p');
                    tempP.setAttribute("onclick", "removeTransObject(" + i + ", 0" + ")");

                    var tempTrans = allTransData.filter(function (el) {return el.eID == allUsers[0].transactions[i];});

                    tempP.innerHTML = `${tempTrans[0].vreme} | x${tempTrans[0].artikli[0].kolicina} | ${-tempTrans[0].artikli[0].komadCena} rsd | ${tempTrans[0].artikli[0].imeArtikla}`;

                    tempDiv.appendChild(tempP);
                }

                document.getElementById(`miomirBalance`).innerHTML = `${allUsers[1].balance}rsd`;

                var repeatNum1 = 0;
                while (repeatNum1 != allUsers[1].transactions.length) {
                    repeatNum1++;
                    var i = repeatNum1-1;

                    var tempDiv = document.getElementById('miomirTransactions');
                    var tempP = document.createElement('p');
                    tempP.setAttribute("onclick", "removeTransObject(" + i + ", 1" + ")");

                    var tempTrans = allTransData.filter(function (el) {return el.eID == allUsers[1].transactions[i];});

                    tempP.innerHTML = `${tempTrans[1].vreme} | x${tempTrans[1].artikli[0].kolicina} | ${-tempTrans[1].artikli[0].komadCena} rsd | ${tempTrans[1].artikli[0].imeArtikla}`;

                    tempDiv.appendChild(tempP);
                }
            });

            let dayInMonth = new Date().getDate();
            if (dayInMonth.toString().length == 1) {
                dayInMonth = `0${dayInMonth}`
            }
            
            let monthNum = (new Date().getMonth())+1;
            if (monthNum.toString().length == 1) {
                monthNum = `0${monthNum}`
            }

            let year = new Date().getFullYear();

            document.getElementById(`newTransDate`).value = `${dayInMonth}.${monthNum}.${year}.`;

            document.getElementById(`newTransHolder`).style.display = `block`;
            document.getElementById(`userDataHolder`).style.display = `flex`;
        })
    }
}

function removeTransObject(arrayNum, recUser) {
    if (confirm("Da li ste sigurni da želite da obrišete ovu transakciju?")) {
        fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
        .then(response=> response.json())
        .then((allUsers) => {
            allUsers[recUser].transactions.splice(arrayNum, 1);

            fetch(`https://json.extendsclass.com/bin/90aa08ae7a2e`, {
                method: 'PUT',
                headers: {
                    'Security-key': 'perinaSoba'
                },
                body: JSON.stringify(allUsers)
            })
            .then(response=> response.json())
            .then((writeResponse) => {
                alert(JSON.stringify(writeResponse));

                location.reload();
            });
        })
    }
}

function addNewTrans() {
    if (confirm("Da li ste sigurni da želite da dodate transakciju?")) {
        fetch('https://json.extendsclass.com/bin/987bd36c8663')
        .then(response => response.json())
        .then((allTransData) => {
            function letterGenerator(length) {
                let result = '';
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return result;
            }
            function numberGenerator(length) {
                let result = '';
                const characters = '0123456789';
                const charactersLength = characters.length;
                let counter = 0;
                while (counter < length) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    counter += 1;
                }
                return result;
            }

            var userId = parseInt(document.getElementById(`personPicker`).value);

            var newTransDate = document.getElementById(`newTransDate`).value;
            var newTransStoreName = document.getElementById(`newTransStoreName`).value;
            var newTransSeller = document.getElementById(`newTransSeller`).value;
            var newTransItem = document.getElementById(`newTransItem`).value;
            var newTransAmount = parseInt(document.getElementById(`newTransAmount`).value);

            var newTransPiecePrice = parseInt(document.getElementById(`newTransPiecePrice`).value);
            var newTransTotalyPaid = parseInt(document.getElementById(`newTransTotalyPaid`).value);
            var newTransChange = parseInt(document.getElementById(`newTransChange`).value);

            var newEID = `${numberGenerator(1)}${letterGenerator(2)}${numberGenerator(2)}${letterGenerator(1)}`;

            var thisTrans = allTransData.filter(function (el) {return el.eID == newEID;});

            while (thisTrans[0] != undefined) {
                newEID = `${numberGenerator(1)}${letterGenerator(2)}${numberGenerator(2)}${letterGenerator(1)}`;

                thisTrans = allTransData.filter(function (el) {return el.eID == newEID;});
            }

            var template = {
                "eID": newEID,
                "prodavac": newTransStoreName,
                "kasir": newTransSeller,
                "artikli": [
                    {
                        "imeArtikla": newTransItem,
                        "idArtikla": null,
                        "oznakaPoreza": "A",
                        "komadCena": newTransPiecePrice,
                        "kolicina": newTransAmount,
                        "ukupnaCena": (newTransPiecePrice * newTransAmount)
                    }
                ],
                "platniTip": "",
                "ukupnaCena": (newTransPiecePrice * newTransAmount),
                "uplaceno": (newTransPiecePrice * newTransAmount),
                "kusur": null,
                "vreme": newTransDate,
                "podaciOPlatnojKartici": {
                    "nosilacKartice": "",
                    "idKartice": "",
                    "tipKartice": "",
                    "goldKartica": ""
                }
            }
            
            fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
            .then(response=> response.json())
            .then((allUsers) => {
                if (userId == 0 || userId == 1) {
                    template.platniTip = "Kartica";
                    template.ukupnaCena = (newTransPiecePrice * newTransAmount);
                    template.uplaceno = (newTransPiecePrice * newTransAmount);

                    var goldCard;
                    if (userId == 0) {
                        goldCard = "Da"; 
                    } else {
                        goldCard = "Ne"; 
                    }

                    allUsers[userId].balance = allUsers[userId].balance - (newTransPiecePrice * newTransAmount);
                    
                    template.podaciOPlatnojKartici = {
                        "nosilacKartice": allUsers[userId].nameAndSurname,
                        "idKartice": allUsers[userId].creditCard.mainCardNumbers,
                        "tipKartice": allUsers[userId].creditCard.cardNetwork,
                        "goldKartica": goldCard
                    }

                    allUsers[userId].transactions.unshift(`${newEID}`);
                } else if (userId == 2) {
                    template.platniTip = "Gotovina";
                    template.ukupnaCena = (newTransPiecePrice * newTransAmount);
                    template.uplaceno = newTransTotalyPaid;
                    template.kusur = newTransChange;

                    template.podaciOPlatnojKartici = null
                }

                allTransData.unshift(template);
                
                fetch(`https://json.extendsclass.com/bin/90aa08ae7a2e`, {
                    method: 'PUT',
                    headers: {
                        'Security-key': 'perinaSoba'
                    },
                    body: JSON.stringify(allUsers)
                })
                .then(response=> response.json())
                .then((writeResponse) => {
                    alert(`Kod transakcije: ${newEID}`);
                });

                fetch(`https://json.extendsclass.com/bin/987bd36c8663`, {
                    method: 'PUT',
                    headers: {
                        'Security-key': 'perinaSoba'
                    },
                    body: JSON.stringify(allTransData)
                })
                .then(response=> response.json())
                .then((writeResponse) => {
                    location.reload();
                });
            });
        })
    }
}

function newTransRecivier() {
    var picker = document.getElementById("personPicker");
    if (parseInt(picker.value) == 0 || parseInt(picker.value) == 1) {
        document.getElementById("newTransTotalyPaidTitle").style.display = "none";
        document.getElementById("newTransTotalyPaid").style.display = "none";

        document.getElementById("newTransChangeTitle").style.display = "none";
        document.getElementById("newTransChange").style.display = "none";
    } else if (parseInt(picker.value) == 2) {
        document.getElementById("newTransTotalyPaidTitle").style.display = "block";
        document.getElementById("newTransTotalyPaid").style.display = "block";

        document.getElementById("newTransChangeTitle").style.display = "block";
        document.getElementById("newTransChange").style.display = "block";
    }
}
newTransRecivier();