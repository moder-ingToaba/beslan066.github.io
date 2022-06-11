function j(arg1, arg2) {
    if (typeof arg1 === 'string' || arg1 instanceof String) {
        return document.querySelector(arg1);
    }
}

function l(arg1) {
    console.log(arg1);
}

function getObjComplexRect(argObj) {
    let bcr = argObj.getBoundingClientRect();
    var R = {
        // x: parseInt(R.style.left),
        // y: parseInt(R.style.top),
        x: argObj.offsetLeft,
        y: argObj.offsetTop,
        clientX: bcr.clientX,
        clientY: bcr.clientY,
        width: argObj.offsetWidth,
        height: argObj.offsetHeight
    }
    return R;
}