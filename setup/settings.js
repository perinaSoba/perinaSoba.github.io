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

    const body = document.createElement('style'); 
    body.innerHTML = 'body{background-color: #201c1c;}';
    document.body.append(body);

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

    const tabButton_HOVER_span = document.createElement('style'); 
    tabButton_HOVER_span.innerHTML = '.tabButton:hover span {background-color: #383a3c!important;}';
    document.body.append(tabButton_HOVER_span);

    const activeCard_span = document.createElement('style'); 
    activeCard_span.innerHTML = '.activeCard span{background-color: #0f537d!important; color: #c2e7ff!important;}';
    document.body.append(activeCard_span);

    const pgBanner_h1 = document.createElement('style'); 
    pgBanner_h1.innerHTML = '#pgBanner h1{color: #fff!important;}';
    document.body.append(pgBanner_h1);

    const logInDiv = document.createElement('style'); 
    logInDiv.innerHTML = '#logInDiv{border: 0.1rem #8b8e8c solid!important; background-color: transparent;}';
    document.body.append(logInDiv);

    const textBox = document.createElement('style'); 
    textBox.innerHTML = '.textBox{background-color: #28292a!important;}';
    document.body.append(textBox);
    
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

    const mainInfo_buyBox_data_main_buyButton = document.createElement('style'); 
    mainInfo_buyBox_data_main_buyButton.innerHTML = '.mainInfo .buyBox .data .main .buyButton{background-color: #004a77;}';
    document.body.append(mainInfo_buyBox_data_main_buyButton);

    const mainInfo_buyBox_data_main_buyButton_HOVER = document.createElement('style'); 
    mainInfo_buyBox_data_main_buyButton_HOVER.innerHTML = '.mainInfo .buyBox .data .main .buyButton:hover{background-color: #125680;}';
    document.body.append(mainInfo_buyBox_data_main_buyButton_HOVER);

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
    logOutButton.innerHTML = '#logOutButton{background-color: #004a77!important;}';
    document.body.append(logOutButton);

    const onPageUserInfoCard_contextHolder_mainData_onPageUserImage = document.createElement('style'); 
    onPageUserInfoCard_contextHolder_mainData_onPageUserImage.innerHTML = '#onPageUserInfoCard .contextHolder .mainData #onPageUserImage{border-color: #0f537d!important;}';
    document.body.append(onPageUserInfoCard_contextHolder_mainData_onPageUserImage);

    const mainInfo_buyBox_onSale_svg = document.createElement('style'); 
    mainInfo_buyBox_onSale_svg.innerHTML = '.mainInfo .buyBox .onSale svg{fill: #fff;}';
    document.body.append(mainInfo_buyBox_onSale_svg);

    const errorDiv = document.createElement('style'); 
    errorDiv.innerHTML = '#errorDiv {background-color: #201c1c;}';
    document.body.append(errorDiv);

    const errorDiv_span_a = document.createElement('style'); 
    errorDiv_span_a.innerHTML = '#errorDiv span a{color: #a8c7fa!important;}';
    document.body.append(errorDiv_span_a);

    const box = document.createElement('style'); 
    box.innerHTML = '.box{background-color: #28292a!important;}';
    document.body.append(box);

    const listedInfo = document.createElement('style'); 
    listedInfo.innerHTML = '.listedInfo{background-color: #28292a!important;}';
    document.body.append(listedInfo);

    const listedInfo_dataCont_dataInfo = document.createElement('style'); 
    listedInfo_dataCont_dataInfo.innerHTML = '.listedInfo .dataCont .dataInfo{background-color: #004a77!important;}';
    document.body.append(listedInfo_dataCont_dataInfo);

    const loggedInDiv_transDiv = document.createElement('style'); 
    loggedInDiv_transDiv.innerHTML = '#loggedInDiv #transDiv{background-color: #004a77!important;}';
    document.body.append(loggedInDiv_transDiv);

    const loggedInDiv_lttlSpc = document.createElement('style'); 
    loggedInDiv_lttlSpc.innerHTML = '#loggedInDiv .lttlSpc{border-color: #004a77!important;}';
    document.body.append(loggedInDiv_lttlSpc);

    const loggedInDiv_userInfo_img = document.createElement('style'); 
    loggedInDiv_userInfo_img.innerHTML = '#loggedInDiv .userInfo img{border-color: #004a77!important;}';
    document.body.append(loggedInDiv_userInfo_img);

    const productPreviewCont_productPreviewBox = document.createElement('style'); 
    productPreviewCont_productPreviewBox.innerHTML = '.productPreviewCont .productPreviewBox{background-color: #28292a!important;}';
    document.body.append(productPreviewCont_productPreviewBox);

    const productPreviewCont_productPreviewBox_HOVER = document.createElement('style'); 
    productPreviewCont_productPreviewBox_HOVER.innerHTML = '.productPreviewCont .productPreviewBox:hover{background-color: #004a77!important;}';
    document.body.append(productPreviewCont_productPreviewBox_HOVER);

    const mainMultCont = document.createElement('style'); 
    mainMultCont.innerHTML = '.mainMultCont{background-color: #28292a!important;}';
    document.body.append(mainMultCont);

    const multiCont_textBox = document.createElement('style'); 
    multiCont_textBox.innerHTML = '.multiCont .textBox{background-color: #004a77!important;}';
    document.body.append(multiCont_textBox);

    const multiCont_textBox_p = document.createElement('style'); 
    multiCont_textBox_p.innerHTML = '.multiCont .textBox p{color: #fff!important;}';
    document.body.append(multiCont_textBox_p);

    const shopHolder_shopItem = document.createElement('style'); 
    shopHolder_shopItem.innerHTML = '.shopHolder .shopItem{background-color: #28292a!important;}';
    document.body.append(shopHolder_shopItem);

    const shopHolder_shopItem_shopItemImage = document.createElement('style'); 
    shopHolder_shopItem_shopItemImage.innerHTML = '.shopHolder .shopItem .shopItemImage{border: 0.1rem #004a77 solid!important;}';
    document.body.append(shopHolder_shopItem_shopItemImage);

    const shopHolder_shopItem_shopItemBuy = document.createElement('style'); 
    shopHolder_shopItem_shopItemBuy.innerHTML = '.shopHolder .shopItem .shopItemBuy{background-color: #004a77!important;}';
    document.body.append(shopHolder_shopItem_shopItemBuy);

    const bookCont = document.createElement('style'); 
    bookCont.innerHTML = '.bookCont{background-color: #28292a!important;}';
    document.body.append(bookCont);

    const popUp = document.createElement('style'); 
    popUp.innerHTML = '.popUp{background-color: #2d2f31!important;}';
    document.body.append(popUp);

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
        setCookie(`tema`, `tamna`, 365);
    } else if (themeSwitchButt.firstElementChild.innerText.includes("light_mode")) {
        location.reload();
        setCookie(`tema`, `svetla`, 365);
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

        try {
            activeCard.classList.remove(`activeCard`);
        } catch (e) {
            
        }
    
        pageContent.style.filter = `blur(5px)`;
        
        navButt.classList.add(`activeCard`);
    }
}