window.addEventListener("scroll", function () {
    var elm = document.querySelector('.gotop');
    if(elm) {
        if (document.body.scrollTop < 100) {
            elm.style.display = "none"
        } else {
            elm.style.display = "block"
        }
    }
});

