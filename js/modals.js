function popShowDownwards(id_, hide_func, newBottom, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.bottom = newBottom;
    pop_.style.zIndex = newZ + 1;
    showMask(hide_func, newZ);
}

function popShowUpwards(id_, hide_func, newBottom, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.bottom = newBottom;
    pop_.style.zIndex = newZ + 1;
    showMask(hide_func, newZ);
}

function popAppear(id_, hide_func, newOpac, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.zIndex = newZ + 1;
    pop_.style.left = "auto";
    pop_.style.opacity = newOpac;
    showMask(hide_func, newZ);
}

function popHideFilter() {
    document.getElementById("filter-pop").style.bottom = "100%";
    removeMask(1);
}

function popHideCreatePost() {
    document.getElementById("create-post").style.bottom = "-120%";
    removeMask(1);
}

function popHideModMenu() {
    document.getElementById("mod-menu").style.bottom = "-120%";
    removeMask(1);
}

function popHideSub() {
    document.getElementById("sub-pop").style.bottom = "-120%";
    removeMask(1);
}

function popHideBlackList() {
    document.getElementById("black-list-pop").style.bottom = "-120%";
    removeMask(3);
}

function popHideModResult() {
    var MR = document.getElementById("mod-result")
    MR.style.opacity = 0;
    MR.style.zIndex = -1;
    MR.style.left = "-110%";
    removeMask(5);
}

function popHideEventsMenu() {
    document.getElementById("events-menu").style.top = "100%";
    removeMask(1);
}

function popHideAddEvent() {
    document.getElementById("add-event").style.top = "100%";
    removeMask(1);
}

function showMask(hide_func, maskZ) {
    var maskDiv = document.createElement("div");
    maskDiv.style.width = "100%";
    maskDiv.style.height = "100%";
    maskDiv.style.position = "fixed";
    maskDiv.style.left = "0";
    maskDiv.style.top = "0";
    maskDiv.style.backgroundColor = "rgba(112, 172, 202, 0)";
    maskDiv.style.transition = "0.5s linear 0.3s";
    maskDiv.id = "mask" + maskZ;
    maskDiv.addEventListener("click", hide_func);
    document.body.appendChild(maskDiv);
    maskDiv.style.backgroundColor = "rgba(112, 172, 202, 0.36)";
}

function removeMask(maskZ) {
    var maskDiv = document.getElementById("mask" + maskZ);
    document.body.removeChild(maskDiv);
}

function getHeightByID(id_) {
    return document.getElementById(id_).height;
}

function getWidthByID(id_) {
    return document.getElementById(id_).width;
}

function popSendBlackList() {
    // Здесь отправка, наверное, AJAX

    popHideBlackList();
    popHideSub();
    popAppear('mod-result', popHideModResult, 1, 5);
}