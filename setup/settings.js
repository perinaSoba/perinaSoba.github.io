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
    const star = document.createElement('style'); 
        star.innerHTML = '*{color: #e3e3e3!important;}';
        document.body.append(star);

        const pageContent = document.createElement('style'); 
        pageContent.innerHTML = '#pageContent{background-color: #201c1c;}';
        document.body.append(pageContent);

        const sideBar = document.createElement('style'); 
        sideBar.innerHTML = '#sideBar{background-color: #2d2f31!important;}';
        document.body.append(sideBar);

        const material_symbols_rounded = document.createElement('style'); 
        material_symbols_rounded.innerHTML = '.material-symbols-rounded{color: #c4c7c5!important;}';
        document.body.append(material_symbols_rounded);

        const sideButtons_button_HOVER_span = document.createElement('style'); 
        sideButtons_button_HOVER_span.innerHTML = '#sideButtons button:hover span {background-color: #383a3c!important;}';
        document.body.append(sideButtons_button_HOVER_span);

        const activeCard_span = document.createElement('style'); 
        activeCard_span.innerHTML = '#activeCard span{background-color: #0f537d!important; color: #c2e7ff!important;}';
        document.body.append(activeCard_span);

        const pgBanner_h1 = document.createElement('style'); 
        pgBanner_h1.innerHTML = '#pgBanner h1{color: #fff!important;}';
        document.body.append(pgBanner_h1);

        const logInDiv = document.createElement('style'); 
        logInDiv.innerHTML = '#logInDiv{border: 0.1rem #8b8e8c solid!important; background-color: transparent;}';
        document.body.append(logInDiv);
        
        const textBox_a = document.createElement('style'); 
        textBox_a.innerHTML = '.textBox a{color: #a8c7fa!important;}';
        document.body.append(textBox_a);
        
        const userInfoCard_userImage = document.createElement('style'); 
        userInfoCard_userImage.innerHTML = '#userInfoCard #userImage{border: 0.2rem solid #0f537d;}';
        document.body.append(userInfoCard_userImage);
}

if (getCookie(`tema`) == null) {
    setCookie(`tema`,`svetla`,`365`);
} else if (getCookie(`tema`) != null) {
    if (getCookie(`tema`) == `tamna`) {
        blackThemeSetup();

        document.getElementById(`blackColor`).classList.add(`active`);
        document.getElementById(`whiteColor`).classList.remove(`active`);
    }
}

function setBlackTheme() {
    blackThemeSetup();

    setCookie(`tema`, `tamna`, 365);
    
    document.getElementById(`blackColor`).classList.add(`active`);
    document.getElementById(`whiteColor`).classList.remove(`active`);
}

function setWhiteTheme() {
    setCookie(`tema`, `svetla`, 365);
    
    document.getElementById(`whiteColor`).classList.add(`active`);
    document.getElementById(`blackColor`).classList.remove(`active`);

    location.reload();
}