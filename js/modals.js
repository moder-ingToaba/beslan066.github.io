function popShowDownwards(id_, hide_func, newBottom, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.bottom = newBottom;
    pop_.style.zIndex = newZ;
    showMask(hide_func);
}

function popShowUpwards(id_, hide_func, newTop, newZ) {
    var pop_ = document.getElementById(id_);
    pop_.style.top = newTop;
    pop_.style.zIndex = newZ;
    showMask(hide_func);
}

function popHideFilter() {
    document.getElementById("filter-pop").style.bottom = "100%";
    removeMask();
}

function popHideCreatePost() {
    document.getElementById("create-post").style.top = "100%";
    removeMask();
}

function popHideSub() {
    document.getElementById("sub-pop").style.top = "100%";
    removeMask();
}

function showMask(hide_func) {
    var maskDiv = document.createElement("div");
    maskDiv.style.width = "100%";
    maskDiv.style.height = "100%";
    maskDiv.style.position = "fixed";
    maskDiv.style.left = "0";
    maskDiv.style.top = "0";
    maskDiv.style.backgroundColor = "rgba(112, 172, 202, 0)";
    maskDiv.style.transition = "0.5s linear 0.3s";
    maskDiv.id = "mask";
    maskDiv.addEventListener("click", hide_func);
    document.body.appendChild(maskDiv);
    maskDiv.style.backgroundColor = "rgba(112, 172, 202, 0.36)";
}

function removeMask() {
    var maskDiv = document.getElementById("mask");
    document.body.removeChild(maskDiv);
}

function getHeightByID(id_) {
    return document.getElementById(id_).height;
}

function getWidthByID(id_) {
    return document.getElementById(id_).width;
}