user = {
    token: '5|MTjlttjjZJWayBnaNF8mheKqDixgUhyttTHrfKts'
}
endpoint = 'https://gargalo.ru/api'

function j(arg1, arg2) {
    if (typeof arg1 === 'string' || arg1 instanceof String) {
        return document.querySelector(arg1);
    }
}

function jj(arg1) {
    if (typeof arg1 === 'string' || arg1 instanceof String) {
        return document.querySelectorAll(arg1);
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

function findParentRecursive(element, querySelector_, recursionStopCount = 6) {
    let res = null
    if (recursionStopCount < 1 || querySelector_ == 'body') {
        return res
    }
    let res2 = element.parentElement
    q = querySelector_.substring(1)
    switch(querySelector_[0]) {
        case '#':
            // проверяем id элемента
            if (res2.id == q) {
                res = res2
            } else {
                res = findParentRecursive(res2, querySelector_, recursionStopCount = recursionStopCount - 1)
            }
            break
        case '.':
            // проверяем classList элемента
            if (res2.classList.contains(q)) {
                res = res2
            } else {
                res = findParentRecursive(res2, querySelector_, recursionStopCount = recursionStopCount - 1)
            }
            break
        default:
            // значит проверяем тип элемента
            if (res2.tagName == querySelector_) {
                res = res2
            } else {
                res = findParentRecursive(res2, querySelector_, recursionStopCount = recursionStopCount - 1)
            }
    }
    return res
}
