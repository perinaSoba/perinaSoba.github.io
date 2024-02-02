let payOptionsHolder = document.getElementById(`payOptionsHolder`);
let payOptionTitle = document.getElementById(`payOptionTitle`);
let warningText = document.getElementById(`warningText`);
let methodButts = document.getElementById(`methodButts`);
let ipsQrCodeSpot = document.getElementById(`ipsQrCodeSpot`);
let payOptionNextButt = document.getElementById(`payOptionNextButt`);
let payOptionCancelButt = document.getElementById(`payOptionCancelButt`);

let prodName = ``;
let price = ``;

let currTransState = null;

payOptionsHolder.style.display = `none`;
warningText.style.display = `none`;

function openPayPopUp(value1, value2) {
    stopTransaction();
    payOptionsHolder.style.display = `block`;

    const pageContent_style = document.createElement('style'); 
    pageContent_style.innerHTML = '.contentHolder{filter: blur(5px)!important;}';
    document.body.append(pageContent_style);

    const sideBar_style = document.createElement('style'); 
    sideBar_style.innerHTML = '#sideBar{filter: blur(5px)!important;}';
    document.body.append(sideBar_style);

    if (value2 == -1) {
        currTransState = `messagePopUpOnly`;

        warningText.innerText = `${value1}`;
        warningText.style.display = `block`;

        payOptionTitle.innerText = `Poruka`;

        ipsQrCodeSpot.style.display = `none`;
        methodButts.style.display = `none`;
        payOptionNextButt.innerText = `OK`;
    } else {
        payOptionTitle.innerText = `Izaberite način plaćanja [${value2}rsd]`;

        currTransState = `choosingPaymentMethod`;
    }
    
    prodName = value1;
    price = value2;
}

function changePayOption(optionID) {
    let payType1 = ``;
    let payType2 = ``;
    let payNum1 = ``;
    let payNum2 = ``;

    function changeIcon(id, newIcon) {
        document.getElementById(`payOptionIcon${id}`).remove();
        var tempSpan = document.createElement('span');
        tempSpan.innerHTML = `${newIcon}`;
        tempSpan.classList.add(`material-symbols-rounded`);
        tempSpan.classList.add(`payOptionTick`);
        tempSpan.setAttribute(`id`, `payOptionIcon${id}`);
    
        if (id == 1) {
            document.getElementById(`NBPay`).appendChild(tempSpan);
        } else if (id == 2) {
            document.getElementById(`IPSQR`).appendChild(tempSpan);
        }
    }

    if (optionID == 1) {
        payType1 = `onSurfaceContainer`;
        payType2 = `surfaceElement`;
        payNum1 = 1;
        payNum2 = 2;
    } else if (optionID == 2) {
        payType1 = `surfaceElement`;
        payType2 = `onSurfaceContainer`;
        payNum1 = 2;
        payNum2 = 1;
    }

    changeIcon(payNum1, `check_circle`);
    document.getElementById(`NBPay`).classList.add(`${payType1}`);
    document.getElementById(`NBPay`).classList.remove(`${payType2}`);

    changeIcon(payNum2, `radio_button_unchecked`);
    document.getElementById(`IPSQR`).classList.add(`${payType2}`);
    document.getElementById(`IPSQR`).classList.remove(`${payType1}`);
}


function stopTransaction() {
    payOptionTitle.innerText = `Izaberite način plaćanja`;
    warningText.innerText = `Da li ste sigurni?`;
    ipsQrCodeSpot.src = ``;
    payOptionNextButt.innerText = `Nastavi`;
    payOptionCancelButt.innerHTML = `Poništi`;

    prodName = ``;
    price = ``;

    currTransState = null;

    methodButts.style.display = `flex`;
    ipsQrCodeSpot.style.display = `none`;

    payOptionsHolder.style.display = `none`;
    warningText.style.display = `none`;

    const pageContent_style = document.createElement('style'); 
    pageContent_style.innerHTML = '.contentHolder{filter: blur(0px)!important;}';
    document.body.append(pageContent_style);

    const sideBar_style = document.createElement('style'); 
    sideBar_style.innerHTML = '#sideBar{filter: blur(0px)!important;}';
    document.body.append(sideBar_style);

    changePayOption(1);
}

function finishTransaction() {
    if (currTransState == `paymentMethodChoosen`) {
        currTransState = `processingTransaction`
        
        let payMethod = null;
        let NBPay = document.getElementById(`NBPay`);
        let IPSQR = document.getElementById(`IPSQR`);

        if (NBPay.classList.contains(`onSurfaceContainer`)) {
            payMethod = `nikBank`;
        } else if (IPSQR.classList.contains(`onSurfaceContainer`)) {
            payMethod = `ipsQrCode`;
        } else {
            warningText.innerText = `Desila se nepoznata greška, molimo pokušajte kasnije`;
            warningText.style.display = `block`;

            payOptionTitle.innerText = `Transakcija neuspešna`;

            ipsQrCodeSpot.style.display = `none`;
            methodButts.style.display = `none`;
            payOptionNextButt.innerText = `OK`;

            currTransState = `done`;
        }

        if (payMethod == `nikBank`) {
            if (getCookie(`userCode`) != null) {
                try {
                    const userInformation = decodeJwtResponse(getCookie(`userCode`));
                    
                    var email = userInformation.email;

                    var email = `jamiko1512@gmail.com`;

                    fetch('https://json.extendsclass.com/bin/90aa08ae7a2e')
                    .then(response=> response.json())
                    .then((userData) => { 
                        var arrNum = userData.findIndex(el => el.emails[0] == email);
                        
                        if (arrNum != -1) {
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
                                var userId = arrNum;

                                let dayInMonth = new Date().getDate();
                                if (dayInMonth.toString().length == 1) {
                                    dayInMonth = `0${dayInMonth}`
                                }
                                
                                let monthNum = (new Date().getMonth())+1;
                                if (monthNum.toString().length == 1) {
                                    monthNum = `0${monthNum}`
                                }

                                let year = new Date().getFullYear();

                                var newTransDate = `${dayInMonth}.${monthNum}.${year}.`;
                                var newTransStoreName = prodName.substring(0, prodName.indexOf(` -`));
                                var newTransSeller = `Petar Nikolić`;
                                var newTransItem = prodName;
                                var newTransAmount = 1;

                                var newTransPiecePrice = price;

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
                                    "platniTip": "Kartica",
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
                                
                                var goldCard;
                                if (userId == 0) {
                                    goldCard = "Da"; 
                                } else {
                                    goldCard = "Ne"; 
                                }

                                userData[userId].balance = userData[userId].balance - (newTransPiecePrice * newTransAmount);
                                
                                template.podaciOPlatnojKartici = {
                                    "nosilacKartice": userData[userId].nameAndSurname,
                                    "idKartice": userData[userId].creditCard.mainCardNumbers,
                                    "tipKartice": userData[userId].creditCard.cardNetwork,
                                    "goldKartica": goldCard
                                }

                                userData[userId].transactions.unshift(`${newEID}`);

                                allTransData.unshift(template);
                                try {
                                    fetch(`https://json.extendsclass.com/bin/90aa08ae7a2e`, {
                                        method: 'PUT',
                                        headers: {
                                            'Security-key': 'perinaSoba'
                                        },
                                        body: JSON.stringify(userData)
                                    })
                                    .then(response=> response.json())
                                    .then((writeResponse) => {
                                        console.log(`Users synced!`);
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
                                        warningText.innerText = `Transakcija je uspešna. eID transakcije je ${newEID}`;
                                        warningText.style.display = `block`;
    
                                        payOptionTitle.innerText = `Transakcija uspešna`;
    
                                        ipsQrCodeSpot.style.display = `none`;
                                        methodButts.style.display = `none`;
                                        payOptionNextButt.innerText = `OK`;
    
                                        currTransState = `done`;
                                    });
                                } catch(e) {
                                    console.error(e)
                                }
                            })
                        } else {
                            warningText.innerText = `Na vašem Google nalogu nije pronađen račun Nik Bank-e`;
                            warningText.style.display = `block`;

                            payOptionTitle.innerText = `Transakcija neuspešna`;

                            ipsQrCodeSpot.style.display = `none`;
                            methodButts.style.display = `none`;
                            payOptionNextButt.innerText = `OK`;

                            currTransState = `done`;
                        }
                    });
                } catch(e) {
                    warningText.innerText = `Desila se nepoznata greška, molimo pokušajte opet kasnije`;
                    warningText.style.display = `block`;

                    payOptionTitle.innerText = `Transakcija neuspešna`;

                    ipsQrCodeSpot.style.display = `none`;
                    methodButts.style.display = `none`;
                    payOptionNextButt.innerText = `OK`;

                    currTransState = `done`;
                }
            } else {
                warningText.innerText = `Da bi ste platili putem Nik Bank-e morate da se ulogujete na svoj Google nalog`;
                warningText.style.display = `block`;

                payOptionTitle.innerText = `Transakcija neuspešna`;

                ipsQrCodeSpot.style.display = `none`;
                methodButts.style.display = `none`;
                payOptionNextButt.innerText = `OK`;

                currTransState = `done`;
            }
        } else if (payMethod == `ipsQrCode`) {
            try {
                async function showIPSQRCode(var1) {
                    const rawResponse = await fetch('https://nbs.rs/QRcode/api/qr/v1/gen', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "K": "PR",
                            "V": "01",
                            "C": "1",
                            "R": "170001084150000042",
                            "N": "Petar Nikolic",
                            "I": `RSD${var1},00`,
                            "SF": "289"
                        })
                    });
                
                    let objectURL = URL.createObjectURL(await rawResponse.blob());
                
                    ipsQrCodeSpot.src = objectURL;
                }

                showIPSQRCode(price);

                methodButts.style.display = `none`;
                ipsQrCodeSpot.style.display = `block`;

                payOptionTitle.innerText = `Skenirajte IPS QR kod [${price}rsd]`;
                payOptionNextButt.innerText = `Gotovo`;

                warningText.innerText = `Otvorite m-banking aplikacu vaše banke i izaberite opciju "IPS SKENIRAJ"`;
                warningText.style.display = `block`;

                currTransState = `IPSQRCodeScanning`;
            } catch(e) {
                warningText.innerText = `Desila se nepoznata greška, molimo pokušajte opet kasnije`;
                warningText.style.display = `block`;

                payOptionTitle.innerText = `Transakcija neuspešna`;

                ipsQrCodeSpot.style.display = `none`;
                methodButts.style.display = `none`;
                payOptionNextButt.innerText = `OK`;

                currTransState = `done`;
            }
        }
    } else if (currTransState == `IPSQRCodeScanning`) {
        warningText.innerText = `Za potvrdu da je transakcija uspešno obavljena, molimo pogledajte listu transakciju u m-banking aplikaciji vaše banke. Za transakcije plaćene IPS QR kodom se ne generiše eID`;
        warningText.style.display = `block`;

        payOptionTitle.innerText = `Transakcija gotova`;

        ipsQrCodeSpot.style.display = `none`;
        payOptionNextButt.innerText = `OK`;

        currTransState = `done`;
    } else if (currTransState == `done`) {
        stopTransaction();
    } else if (currTransState == `messagePopUpOnly`) {
        stopTransaction();
    } else if (currTransState == `choosingPaymentMethod`) {
        warningText.innerText = `Da li ste sigurni?`;
        warningText.style.display = `block`;

        currTransState = `paymentMethodChoosen`;

        payOptionNextButt.innerText = `Da`;
    }
}