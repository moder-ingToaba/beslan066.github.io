var sendPic = document.getElementById("chat-brd-send-pic");
var msgInput = document.getElementById("msg-input");

msgInput.addEventListener('input', function() {
    if (this.value == '') {
        sendPic.setAttribute('src', "../../img/chat/Mic.png");
    } else {
        sendPic.setAttribute('src', "../../img/chat/SendPlane.png");
    }
})