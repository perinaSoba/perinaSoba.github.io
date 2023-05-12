// Cookie functions
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
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

function blackThemeSetup() {
    // Script-based design
    const star = document.createElement('style'); 
    star.innerHTML = '*{color: #e3e3e3!important;}';
    document.body.append(star);

    // Theme Button
    const themeSwitchButt = document.createElement('style'); 
    themeSwitchButt.innerHTML = '#themeSwitchButt {border: 0.1rem #8b8e8c solid!important; background-color: transparent!important;}';
    document.body.append(themeSwitchButt);

    const themeSwitchButt_span = document.getElementById('themeSwitchButt').firstElementChild
    themeSwitchButt_span.innerHTML = 'light_mode';

    const themeEmoji = document.getElementById('themeEmoji')
    themeEmoji.innerHTML = 'light_mode';

    const mobThemeText = document.getElementById('mobThemeText')
    mobThemeText.innerHTML = 'Podesi svetlu temu';

    // Set body class
    document.body.classList.add(`darkTheme`);

    // Save cookie
    setCookie(`tema`, `tamna`, 365);
}

if (getCookie(`tema`) == null) {
    setCookie(`tema`,`svetla`,`365`);
} else if (getCookie(`tema`) != null) {
    if (getCookie(`tema`) == `tamna`) {
        blackThemeSetup();
    }
}

function setBlackTheme() {
    blackThemeSetup();

    setCookie(`tema`, `tamna`, 365);
}

function setWhiteTheme() {
    setCookie(`tema`, `svetla`, 365);

    location.reload();
}

function switchTheme() {
    var themeSwitchButt = document.getElementById("themeSwitchButt");

    if (themeSwitchButt.firstElementChild.innerText.includes("dark_mode")) {
        blackThemeSetup();
    } else if (themeSwitchButt.firstElementChild.innerText.includes("light_mode")) {
        setWhiteTheme()
    }
}

document.getElementById("themeSwitchButt").addEventListener("click", switchTheme);

function openOtherPopUp() {
    var navButt = document.getElementById(`otherNavButt`);
    var activeCard = document.getElementById(`activeCard`);
    var pageContent = document.getElementById(`pageContent`);
    var popUp = document.getElementById(`sidePopUp`);
    var popUpVisible = popUp.style.display == `flex`;

    if (popUpVisible) {
        popUp.style.display = `none`;

        navButt.classList.remove(`activeCard`);

        pageContent.style.filter = `none`; 

        try {
            activeCard.classList.add(`activeCard`);
        } catch (e) {
            
        }
    } else if (!popUpVisible) {
        popUp.style.display = `flex`;

        console.log(activeCard.parentElement.id)
        console.log(activeCard.parentElement.id != `sidePopUp`)

        try {
            if (activeCard.parentElement.id != `sidePopUp`) {
                activeCard.classList.remove(`activeCard`);
            }
        } catch (e) {
            
        }
    
        pageContent.style.filter = `blur(5px)`;
        
        navButt.classList.add(`activeCard`);
    }
}

function mobNavOpen() {
    var mobileNav = document.getElementById("mobileNav");
    var mobNavButt = document.getElementById("mobNavButt");

    if (window.getComputedStyle(mobileNav, null).display == "none") {
        mobileNav.style.display = "block";
        mobNavButt.style.background = "transparent";

        const pageContent_style = document.createElement('style'); 
        pageContent_style.innerHTML = '.contentHolder{filter: blur(5px)!important;}';
        document.body.append(pageContent_style);
    } else if (window.getComputedStyle(mobileNav, null).display == "block") {
        mobileNav.style.display = "none";
        mobNavButt.style.background = "#fff";
        
        const pageContent_style = document.createElement('style'); 
        pageContent_style.innerHTML = '.contentHolder{filter: none!important;}';
        document.body.append(pageContent_style);
    }
}

function showOtherOptions() {
    var mobOtherOptionDiv = window.getComputedStyle(document.getElementById(`mobOtherOptionDiv`), null).display;

    if (mobOtherOptionDiv == `none`) {
        const mobOtherOptionDiv_style = document.createElement('style'); 
        mobOtherOptionDiv_style.innerHTML = '#mobOtherOptionDiv{display: block!important;}';
        document.body.append(mobOtherOptionDiv_style);
    } else if (mobOtherOptionDiv == `block`) {
        const mobOtherOptionDiv_style = document.createElement('style'); 
        mobOtherOptionDiv_style.innerHTML = '#mobOtherOptionDiv{display: none!important;}';
        document.body.append(mobOtherOptionDiv_style);
    }
}