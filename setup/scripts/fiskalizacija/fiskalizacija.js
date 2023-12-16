fetch('https://json.extendsclass.com/bin/987bd36c8663')
.then(response=> response.json())
.then((allTransData) => {
    // Cookies
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

    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;

        if (query === url || query === "") return;

        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);

            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        } 
        return parms;
    };

    var urlData = parseURLParams(`${document.location.href}`);
    try {
        var eID = urlData.eID;
    } catch(e) {
        document.getElementById("billHeading").innerHTML = "eID računa nije unet";
        document.getElementById("billData").style.display = "none";
        document.getElementById("productHolder").style.display = "none";
        document.getElementById("cardInfo").style.display = "none";
    }

    var thisTrans = allTransData.filter(function (el) {
        return el.eID == eID;
    });
    thisTrans = thisTrans[0];

    if (thisTrans != undefined) {
        document.getElementById("billHeading").innerHTML = `eID računa - ${eID}`;

        document.getElementById("storeName").innerHTML = thisTrans.prodavac;
        document.getElementById("sellerName").innerHTML = thisTrans.kasir;
        document.getElementById("payMethod").innerHTML = thisTrans.platniTip;
        document.getElementById("totalPrice").innerHTML = `${thisTrans.ukupnaCena} rsd`;

        if (thisTrans.podaciOPlatnojKartici != null) {
            document.getElementById("cardHolder").innerHTML = thisTrans.podaciOPlatnojKartici.nosilacKartice;
            document.getElementById("cardIdentifier").innerHTML = thisTrans.podaciOPlatnojKartici.idKartice;
            document.getElementById("cardType").innerHTML = thisTrans.podaciOPlatnojKartici.tipKartice;
            document.getElementById("goldCard").innerHTML = thisTrans.podaciOPlatnojKartici.goldKartica;
        } else {
            document.getElementById("cardInfo").style.display = "none";
        }

        var repeatNum = 0;
        while (repeatNum != allTransData.length) {
            repeatNum++;
            var i = repeatNum-1;

            // Row
            var tempTr = document.createElement('tr');
            // Row data
            var tempName = document.createElement('td');
            var tempPrice = document.createElement('td');
            var tempAmount = document.createElement('td');
            var tempTotal = document.createElement('td');

            // Set element styles
            tempTr.classList.add("transparentElement");

            tempName.classList.add("onSurfaceBorderElement");
            tempPrice.classList.add("onSurfaceBorderElement");
            tempAmount.classList.add("onSurfaceBorderElement");
            tempTotal.classList.add("onSurfaceBorderElement");

            tempName.classList.add("fontText");
            tempPrice.classList.add("fontText");
            tempAmount.classList.add("fontText");
            tempTotal.classList.add("fontText");

            // Set element data
            tempName.innerHTML = `${thisTrans.artikli[i].imeArtikla} (${thisTrans.artikli[i].oznakaPoreza})`;
            tempPrice.innerHTML = `${thisTrans.artikli[i].komadCena} rsd`;
            tempAmount.innerHTML = `x${thisTrans.artikli[i].kolicina}`;
            tempTotal.innerHTML = `${thisTrans.artikli[i].ukupnaCena} rsd`;

            // Set elemnts location
            document.getElementById("itemsOnBill").appendChild(tempTr);

            tempTr.appendChild(tempName);
            tempTr.appendChild(tempPrice);
            tempTr.appendChild(tempAmount);
            tempTr.appendChild(tempTotal);
        }
    } else {
        document.getElementById("billHeading").innerHTML = "eID računa koji ste uneli ne postoji u našem sistemu";
        document.getElementById("billData").style.display = "none";
        document.getElementById("productHolder").style.display = "none";
        document.getElementById("cardInfo").style.display = "none";
    }
});
