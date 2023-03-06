function makeResponse() {
    var inputText = document.getElementById("userInput").value.toLowerCase();
    var chatHolder = document.getElementById("bubbleHolder")

    var questionSpan = document.createElement('span');
    questionSpan.classList.add("userBallon");
    questionSpan.innerText = document.getElementById("userInput").value;
    chatHolder.appendChild(questionSpan);

    document.getElementById("userInput").value = "";

    var responseText = "Izgleda da nemam odgovor na vaš upit. Molim vas da pokušate ponovo sa drugim ili da preformulišete postojeći."

    // Nik Magic related
    if (inputText.includes("lego")) {
        if (inputText.includes("1") || inputText.includes("i")) {
            if (inputText.includes("pro")) {
                responseText = "Pro verzija Lego I telefona vam daje mogućnost bežičnog punjenja kao i potpunu vodootpornost.\n\nCena telefona je 50€ i trenutno nije dostupan za kupovinu.\n\nZa više informacija posetite: https://perinasoba.github.io/nikMagic/uredaji/legoIPro";
            } else if (inputText.includes("mini")) {
                responseText = "Najmanji telefon koji možete naći a da se uklapa u tematiku Lego sveta od proizvođača Nik Magic.\n\nCena telefona je 15€ i dostupan je u Lego nijansi.\n\nZa više informacija posetite: https://perinasoba.github.io/nikMagic/uredaji/legoMini";
            } else {
                responseText = "Telefon prve generacije telefona Nik Magic-a vam daje starinski hardware i moderan software od proizvođača Nik Magic.\n\nCena telefona je 20€ i dostupan je u beloj boji.\n\nZa više informacija posetite: https://perinasoba.github.io/nikMagic/uredaji/legoI";
            }
        } else if (inputText.includes("mini")) {
            responseText = "Najmanji telefon koji možete naći a da se uklapa u tematiku Lego sveta od proizvođača Nik Magic.\n\nCena telefona je 15€ i dostupan je u Lego nijansi.\n\nZa više informacija posetite: https://perinasoba.github.io/nikMagic/uredaji/legoMini";
        } else if (inputText.includes("watch") || inputText.includes("sat")) {
            responseText = "Smanjeni blizanac Lego I i Lego I Pro telefona pokrenut najnovijim BlackOS-om sa neverovatni dizajnom narukvice od proizvođača Nik Magic.\n\nCena sata je 30€ i dostupan je za kupovinu.\n\nZa više informacija posetite: https://perinasoba.github.io/nikMagic/uredaji/legoWatch";
        }
    }

    var response = document.createElement('span');
    response.classList.add("botBallon");
    response.innerText = responseText;
    chatHolder.appendChild(response);
}