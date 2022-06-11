var mousedown = false;
var touched = false;
var bulbToMove = null;
var connLineToMove = null;
var slidePersonToConnect = null;
var x = 0;
var y = 0;
var touchStartX = 0;
var touchStartY = 0;
var targetStartX = 0;
var targetStartY = 0;
var targetSlide = null;

window.onload = function() {
    document.querySelector('#popAddPerson').addEventListener('mousemove', onMouseMoveForBulb, true);
    document.querySelector('#popAddPerson').addEventListener('mouseup', onMouseUpForBulb, true);

    document.querySelector('#popAddPerson').addEventListener('touchmove', onTouchMoveForBulb, true);
    document.querySelector('#popAddPerson').addEventListener('touchend', onTouchEndForBulb, true);
}

function onMouseDownForBulb(e) {
    bulbToMove = e.target;
    connLineToMove = document.querySelector('#conn-line-' + bulbToMove.id.substring(4));
    slidePersonToConnect = document.querySelector('#slide-person-' + bulbToMove.id.substring(4));
    targetSlide = bulbToMove.parentElement.querySelector('.slide-preview');
    // targetSlide.addEventListener('mousemove', onMouseMoveForBulb, true);
    mousedown = true;
    x = bulbToMove.offsetLeft - e.clientX;
    y = bulbToMove.offsetTop  - e.clientY;
}

function onMouseMoveForBulb(e) {
    if (mousedown) {
        bulbToMove.style.left = e.clientX + x + 'px';
        bulbToMove.style.top = e.clientY  + y + 'px';
        _clSet(connLineToMove, bulbToMove, slidePersonToConnect, bulbToMove.parentElement);
    }
}

function onMouseUpForBulb(e) {
    mousedown = false;
    // targetSlide.removeEventListener('mousemove', onMouseMoveForBulb, true);
}

function onTouchStartForBulb(e) {
    if (e.touches.length === 1) {
        bulbToMove = e.target;
        connLineToMove = document.querySelector('#conn-line-' + bulbToMove.id.substring(4));
        slidePersonToConnect = document.querySelector('#slide-person-' + bulbToMove.id.substring(4));
        targetSlide = bulbToMove.parentElement.querySelector('.slide-preview');
        // targetSlide.addEventListener('touchmove', onTouchMoveForBulb, true);
        let touch = e.touches[0];
        touched = true;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        // targetStartX = parseInt(bulbToMove.style.left);
        // targetStartY = parseInt(bulbToMove.style.top);
        targetStartX = bulbToMove.offsetLeft;
        targetStartY = bulbToMove.offsetTop;
        e.preventDefault();
    }
}

function onTouchMoveForBulb(e) {
    if (touched && e.touches.length === 1) {
        let touch = e.touches[0];
        bulbToMove.style.left = (targetStartX + touch.clientX - touchStartX) + 'px';
        bulbToMove.style.top  = (targetStartY + touch.clientY - touchStartY) + 'px';
        _clSet(connLineToMove, bulbToMove, slidePersonToConnect, bulbToMove.parentElement);
        e.preventDefault();
    }
}

function onTouchEndForBulb(e) {
    touched = false;
    // targetSlide.removeEventListener('touchmove', onTouchMoveForBulb, true);
    // e.preventDefault();
}

/* help funcs */

function _apMakeBulb(e) {
    var b = document.createElement('div');
    b.classList.add('pers-bulb');
    b.addEventListener('mousedown', onMouseDownForBulb, true);
    b.addEventListener('touchstart', onTouchStartForBulb, true);

    return b;
}

function _apMakeConnLine(e) {
    var cl = document.createElement('div');
    cl.classList.add('pers-conn-line');
    cl.setAttribute('onclick', 'addPersonOnClick(event);');
    return cl;
}

function _apMakeSlidePerson(e) {
    var sp = document.createElement('img');
    sp.classList.add('slide-person');
    sp.setAttribute('src', '../../img/profile.svg');
    // ToDo sp.setAttribute('onclick', '');
    return sp;
}