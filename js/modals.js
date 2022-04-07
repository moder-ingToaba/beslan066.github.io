function popShowDownwards(id_, hide_func, newBottom, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.bottom = newBottom;
    pop_.style.zIndex = newZ;
    showMask(hide_func, newZ + 1);
}

function popShowUpwards(id_, hide_func, newTop, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.top = newTop;
    pop_.style.zIndex = newZ;
    showMask(hide_func, newZ + 1);
}

function popHideFilter() {
    document.getElementById("filter-pop").style.bottom = "100%";
    removeMask(2);
}

function popHideCreatePost() {
    document.getElementById("create-post").style.top = "100%";
    removeMask(2);
}

function popHideModMenu() {
    document.getElementById("mod-menu").style.top = "100%";
    removeMask(2);
}

function popHideSub() {
    document.getElementById("sub-pop").style.top = "100%";
    removeMask(2);
}

function popHideBlackList() {
    document.getElementById("black-list-pop").style.top = "100%";
    removeMask(4);
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