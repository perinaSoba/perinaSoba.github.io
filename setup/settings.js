function blackThemeSetup() {
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

    // Set main colors
    document.documentElement.style.setProperty(`--font`, `#e3e3e3`);
    document.documentElement.style.setProperty(`--link`, `#a8c7fa`);
    document.documentElement.style.setProperty(`--hover`, `#3e484d`);

    document.documentElement.style.setProperty(`--surface`, `#101416`);
    document.documentElement.style.setProperty(`--on-surface`, `#181c1e`);
    document.documentElement.style.setProperty(`--on-surface-container`, `#20414e`);
    document.documentElement.style.setProperty(`--sideBar-active`, `#20414e`);
    document.documentElement.style.setProperty(`--outline`, `#889297`);

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

function mobNavOpen() {
    var mobileNav = document.getElementById("mobileNav");

    if (window.getComputedStyle(mobileNav, null).display == "none") {
        mobileNav.style.display = "block";

        const pageContent_style = document.createElement('style'); 
        pageContent_style.innerHTML = '.contentHolder{filter: blur(5px)!important;}';
        document.body.append(pageContent_style);
    } else if (window.getComputedStyle(mobileNav, null).display == "block") {
        mobileNav.style.display = "none";
        
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