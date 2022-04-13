window.onload = function () {
    window.scroll(0, document.body.scrollHeight);
}

var sendPic = document.getElementById("chat-brd-send-pic");
var msgInput = document.getElementById("msg-input");

msgInput.addEventListener('input', checkMsgInput);

addEvListenersToMsgs();

function checkMsgInput() {
    if (msgInput.value == '') {
        sendPic.setAttribute('src', "../../img/chat/Mic.png");
    } else {
        sendPic.setAttribute('src', "../../img/chat/SendPlane.png");
    }
}

function sendMsg(e) {
    if (e.keyCode == 13) {
        var MC = document.getElementById("messages-container");
        const d = new Date();
        var MM = document.getElementById("msg-input");
        if (MM.value != '') {
            var mS = addEl("div", ["msg-container", "msg-sent"], MC);
            var mT = addEl("div", ["msg-time"], mS, MinsHrsToDoubleDigit(d.getHours().toString())
                     + ':' + MinsHrsToDoubleDigit(d.getMinutes().toString()));
            var mB = addEl("div", ["msg-body"], mS);
            var mP = addEl("p", [""], mB, MM.value);
            var mA = addEl("div", ["msg-ave"], mS);
            var mI = addEl("img", [""], mA);
            
            mI.setAttribute("src", "../../img/User.png");
            mI.setAttribute("alt", "");

            window.scroll(0, document.body.scrollHeight);
            MM.value = '';
            
            checkMsgInput();
            addEvListenerTo1Msg(mS);

        }
    }
}

function addEl(tag_, classes_, parent_, innerHTML_ = "") {
    var El = document.createElement(tag_);
    if (classes_.length > 0) {
        if (classes_[0] != "") {
            for (var i = 0; i < classes_.length; i++) {
                El.classList.add(classes_[i]);
            }
        }
    }
    if (innerHTML_.length > 0) {
        El.innerHTML = innerHTML_;
    }
    parent_.appendChild(El);
    return El;
};

function addEvListenerTo1Msg(MsgContainer) {
    MsgContainer.addEventListener("click", function() {
        this.classList.toggle("selectedMsg");
        loopThrough();
    });
}

function addEvListenersToMsgs() {
    var msgs = document.getElementsByClassName("msg-container");
    Array.from(msgs).forEach(function(msg){
        addEvListenerTo1Msg(msg);
    });
}

var selectedMsgsBar = document.getElementById("selectedMsgsBar");

function loopThrough() {
    var msgs = document.getElementsByClassName("msg-container");
    var selectedMsgCount = 0;
    Array.from(msgs).forEach(function(msg){
        if (msg.classList.contains("selectedMsg")) {
            selectedMsgCount++;
        }
    });
    if (selectedMsgCount > 0) {
        showBar(selectedMsgCount);
    } else {
        hideBar();
    }
}

function showBar(selectedMsgCount) {
    selectedMsgsBar.classList.add("selectedMsgsBarActive");
}

function hideBar() {
    selectedMsgsBar.classList.remove("selectedMsgsBarActive");
}

function MinsHrsToDoubleDigit(mh) {
    var res = mh;
    if (res.length < 2) {
        res = '0' + mh;
    }
    return res;
}