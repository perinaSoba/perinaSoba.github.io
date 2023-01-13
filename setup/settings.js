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

if (getCookie(`tema`) == null) {
    setCookie(`tema`,`svetla`,`365`);
} else if (getCookie(`tema`) != null) {
    if (getCookie(`tema`) == `tamna`) {
        const star = document.createElement('style'); 
        star.innerHTML = '*{color: #e3e3e3!important;}';
        document.body.append(star);

        const sideBar = document.createElement('style'); 
        sideBar.innerHTML = '#sideBar{background-color: #2d2f31!important;}';
        document.body.append(sideBar);

        const activeCard_img = document.createElement('style'); 
        activeCard_img.innerHTML = '#activeCard img{background-color: #10547c!important; fill: currentColor;}';
        document.body.append(activeCard_img);
    }
}