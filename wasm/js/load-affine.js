let ua = navigator.userAgent;

if (! (ua.match(/Android/)  && ua.match(/Chrome/)) ) {
    import("./affine.js");
} else {
    let flag = window.confirm('Android Chromeで一部環境ではアプリが固まる可能性があります。リスクを承知して良ければOKを押してください');
    if (flag) {
        import("./affine.js");
    }    
}
