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

    const mobNavButt = document.createElement('style'); 
    mobNavButt.innerHTML = '#mobNavButt{background-color: #2d2f31!important;}';
    document.body.append(mobNavButt);

    const mobileNav = document.createElement('style'); 
    mobileNav.innerHTML = '#mobileNav{background-color: #2d2f31!important;}';
    document.body.append(mobileNav);

    const mobileNav_currPageMob = document.createElement('style'); 
    mobileNav_currPageMob.innerHTML = '#mobileNav #currPageMob{background-color: #0f537d!important; color: #bce2fa;}';
    document.body.append(mobileNav_currPageMob);

    const mobileNav_a_HOVER = document.createElement('style'); 
    mobileNav_a_HOVER.innerHTML = '#mobileNav a:hover{background-color: #383a3c!important; color: #bce2fa;}';
    document.body.append(mobileNav_a_HOVER);

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

    const mobLogInDiv = document.createElement('style'); 
    mobLogInDiv.innerHTML = '#mobLogInDiv{border-color: 0.1rem!important #8b8e8c!important solid!important; background-color: transparent;}';
    document.body.append(mobLogInDiv);

    const settingsChoser = document.createElement('style'); 
    settingsChoser.innerHTML = '.settingsChoser{background-color: #28292a;}';
    document.body.append(settingsChoser);

    const settingsChoser_span_HOVER = document.createElement('style'); 
    settingsChoser_span_HOVER.innerHTML = '.settingsChoser span:hover{background-color: #343536;}';
    document.body.append(settingsChoser_span_HOVER);

    const settingsChoser_active = document.createElement('style'); 
    settingsChoser_active.innerHTML = '.settingsChoser .active{background-color: #084c74;}';
    document.body.append(settingsChoser_active);

    const settingsChoser_active_HOVER = document.createElement('style'); 
    settingsChoser_active_HOVER.innerHTML = '.settingsChoser .active:hover{background-color: #185484;}';
    document.body.append(settingsChoser_active_HOVER);

    const mainInfo_buyBox = document.createElement('style'); 
    mainInfo_buyBox.innerHTML = '.mainInfo .buyBox{background-color: #28292a;}';
    document.body.append(mainInfo_buyBox);

    const mainInfo_buyBox_main_buyButton = document.createElement('style'); 
    mainInfo_buyBox_main_buyButton.innerHTML = '.mainInfo .buyBox .main .buyButton{background-color: #004a77;}';
    document.body.append(mainInfo_buyBox_main_buyButton);

    const mainInfo_buyBox_main_buyButton_HOVER = document.createElement('style'); 
    mainInfo_buyBox_main_buyButton_HOVER.innerHTML = '.mainInfo .buyBox .main .buyButton:hover{background-color: #125680;}';
    document.body.append(mainInfo_buyBox_main_buyButton_HOVER);

    const storiesCont_div = document.createElement('style'); 
    storiesCont_div.innerHTML = '.storiesCont div{background-color: #28292a;}';
    document.body.append(storiesCont_div);

    const storiesCont_div_HOVER = document.createElement('style'); 
    storiesCont_div_HOVER.innerHTML = '.storiesCont div:hover{background-color: #084c74;}';
    document.body.append(storiesCont_div_HOVER);

    const text_a = document.createElement('style'); 
    text_a.innerHTML = '.text a{color: #a8c7fa!important;}';
    document.body.append(text_a);

    const logOutButton = document.createElement('style'); 
    logOutButton.innerHTML = '#logOutButton{background-color: #28292a!important;}';
    document.body.append(logOutButton);

    const onPageUserInfoCard_contextHolder_mainData_onPageUserImage = document.createElement('style'); 
    onPageUserInfoCard_contextHolder_mainData_onPageUserImage.innerHTML = '#onPageUserInfoCard .contextHolder .mainData #onPageUserImage{border-color: #0f537d!important;}';
    document.body.append(onPageUserInfoCard_contextHolder_mainData_onPageUserImage);

    const mainInfo_buyBox_onSale_svg = document.createElement('style'); 
    mainInfo_buyBox_onSale_svg.innerHTML = '.mainInfo .buyBox .onSale svg{fill: #fff;}';
    document.body.append(mainInfo_buyBox_onSale_svg);

    const errorDiv = document.createElement('style'); 
    errorDiv.innerHTML = '#errorDiv {background-color: #28292a;}';
    document.body.append(errorDiv);

    const errorDiv_span_a = document.createElement('style'); 
    errorDiv_span_a.innerHTML = '#errorDiv span a{color: #a8c7fa!important;}';
    document.body.append(errorDiv_span_a);

    const box = document.createElement('style'); 
    box.innerHTML = '.box{background-color: #28292a!important;}';
    document.body.append(box);

    const accountInfo_dataCont_dataInfo = document.createElement('style'); 
    accountInfo_dataCont_dataInfo.innerHTML = '#accountInfo .dataCont .dataInfo{background-color: #004a77!important;}';
    document.body.append(accountInfo_dataCont_dataInfo);

    const loggedInDiv_transDiv = document.createElement('style'); 
    loggedInDiv_transDiv.innerHTML = '#loggedInDiv #transDiv{background-color: #004a77!important;}';
    document.body.append(loggedInDiv_transDiv);

    const loggedInDiv_lttlSpc = document.createElement('style'); 
    loggedInDiv_lttlSpc.innerHTML = '#loggedInDiv .lttlSpc{border-color: #004a77!important;}';
    document.body.append(loggedInDiv_lttlSpc);

    const loggedInDiv_userInfo_img = document.createElement('style'); 
    loggedInDiv_userInfo_img.innerHTML = '#loggedInDiv .userInfo img{border-color: #004a77!important;}';
    document.body.append(loggedInDiv_userInfo_img);
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