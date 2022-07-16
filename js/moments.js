var lastPersonId = 0;
var lastVideoId = 0;
var searchDivWrapper = j('#search-div-wrapper');
var searchDiv = j('#searchDiv');
var searchDivIsActive = false;
var searchInput = j('#add-person-search');
var momentsGallery = j('#moments-gallery');
var divAddPersonGallery = j('#add-person-gallery');
var addPersonGalleryBackup = '';
var slidePreviews = []

window.addEventListener('resize', function() {
    adjustGallery();
})

/* bkup function showPreview(event) {
    if (event.target.files.length > 0) {
        let ext = checkFileExt(event.target);
        if (ext == '') { return; }
        var src = URL.createObjectURL(event.target.files[0]);
        var previewDiv = document.getElementById("divPreviewBig");
        var previewImg = document.getElementById("imgPreviewBig");
        var previewVid = document.getElementById("vidPreviewBig");
        var previewVidSrc = previewVid.querySelector('source');

        switch (ext) {
            case 'img':
                previewImg.src = src;
                previewImg.style.display = null;
                j('#moment_add_person').style.visibility = 'visible';
                break;
            case 'vid':
                previewVidSrc.src = src;
                previewVid.load();
                previewVid.style.display = null;
                break;
        }
        document.getElementById("lbUploadMedia").style.display = "none";
        previewDiv.style.display = null;
        document.getElementById("lbUploadMedia2").style.display = null;
        j('#add-post-publish').classList.remove('disabled');
    }
} */

function showPreview(sender) {
    // Новая версия showPreview, которая вызывается по клику на мини-изображение
    // или видео и по добавлению файла
    // Здесь sender либо <img>, либо <video>

    let tag = sender.tagName.toLowerCase();

    var previewDiv = document.getElementById("divPreviewBig");
    var previewImg = document.getElementById("imgPreviewBig");
    var previewVid = document.getElementById("vidPreviewBig");
    var previewVidSrc = previewVid.querySelector('source');
    // l('tag is ' + tag)
    previewVid.pause();

    switch (tag) {
        case 'img':
            previewImg.src = sender.src;
            previewVid.style.display = 'none';
            previewImg.style.display = null;
            j('#moment_add_person').style.visibility = 'visible';
            break;
        case 'video':
            previewVidSrc.src = sender.querySelector('source').src;
            previewVid.load();
            previewImg.style.display = 'none';
            previewVid.style.display = null;
            j('#moment_add_person').style.visibility = 'hidden';
            break;
    }
    document.getElementById("lbUploadMedia").style.display = "none";
    previewDiv.style.display = null;
    document.getElementById("lbUploadMedia2").style.display = null;
    j('#add-post-publish').classList.remove('disabled');
}

function addFileSmall(event) {
    if (event.target.files.length > 0) {
        // var wrapToAddBorder
        let ext = checkFileExt(event.target);
        if (ext == '') { return; }
        var previewSender
        var src = URL.createObjectURL(event.target.files[0]);
        // var momentsGallery = document.getElementById("moments-gallery");
        var lbUploadMedia2 = document.getElementById("lbUploadMedia2");
        
        var divGalleryItem = document.createElement("div");
        divGalleryItem.classList.add("gallery-item");
        momentsGallery.insertBefore(divGalleryItem, lbUploadMedia2);
        
        switch (ext) {
            case 'img':
                var divGalleryImgWrap = document.createElement("div");
                divGalleryImgWrap.classList.add("gallery-img-wrap");
                divGalleryItem.appendChild(divGalleryImgWrap);
                var img = document.createElement("img");
                divGalleryImgWrap.appendChild(img);
                img.src = src;
                img.classList.add('s-curPointer');
                img.addEventListener('click', function(event) {
                    // previewMedia(event);
                    showPreview(img)
                });
                // wrapToAddBorder = divGalleryImgWrap;
                previewSender = img
                break;
            case 'vid':
                var divGalleryVidWrap = document.createElement("div");
                divGalleryVidWrap.classList.add("gallery-vid-wrap");
                divGalleryItem.appendChild(divGalleryVidWrap);
                var vid = document.createElement("video");
                vid.classList.add('s-curPointer');
                // vid.setAttribute('controls', 'controls');
                vid.id = 'video-' + lastVideoId;
                // vid.setAttribute('onplay', 'videoplay(this);');
                vid.setAttribute('onclick', 'videoclick(this);');
                divGalleryVidWrap.appendChild(vid);
                var source = document.createElement("source");
                source.src = src;
                source.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                vid.appendChild(source);
                vid.load();
                // vid.addEventListener('click', function(event) {
                //     previewMedia(event);
                // });
                // wrapToAddBorder = divGalleryVidWrap;
                lastVideoId++;
                previewSender = vid
                break;
        }
        if (momentsGallery.getElementsByClassName("gallery-item").length > 8) {
            lbUploadMedia2.style.display = "none";
        }
        adjustGallery();
        // momentPreviewedFrame(wrapToAddBorder);
        showPreview(previewSender);
    }
}

/* function momentPreviewedFrame(previewed) {
    momentsGallery.querySelectorAll('.gallery-item').forEach(elem => {
        elem.querySelector('div').classList.remove('previewed')
    })
    previewed.classList.add('previewed')
} */

function momentDescShow(event) {
    var txtar = document.getElementById('txtarMomentDesc');
    txtar.style.display = null;
    event.target.style.display = "none";
    txtar.focus();
}

function momentDescUnfocused(event) {
    if (event.target.value == '') {
        event.target.style.display = "none";
        var span = document.getElementById("spanMomentDesc");
        span.style.display = null;
    }
}


function addPollV() {
    var El = document.createElement('div');
    El.classList.add('wide');
    El.classList.add('input-container');
    El.style.display = "flex";
    El.style.alignItems = "center";
    var I = document.createElement('input');
    I.setAttribute('type', 'text');
    I.setAttribute('placeholder', '');
    I.setAttribute('name', 'votes[]');
    var Img = document.createElement('img');
    Img.setAttribute('src', '../../img/X.svg');
    Img.setAttribute('alt', '');
    Img.addEventListener('click', deletePollVar);
    document.getElementById('moment-pollvs-container').append(El);
    El.append(I);
    El.append(Img);
    loopThroughPollVs();
    var fmc = document.querySelector('.form-main-container');
    fmc.scroll(0, fmc.scrollHeight);
    I.focus();
}

function loopThroughPollVs() {
    var mpc = document.getElementById('moment-pollvs-container');
    var ics = mpc.querySelectorAll('div');
    var i = 1; 
    ics.forEach(element => {
        var ip = element.querySelector('input');
        // ip.name = 'poll-v' + i.toString();
        // ip.name = 'votes[]';
        ip.id = 'poll-v' + i.toString();
        ip.placeholder = i.toString() + ' вариант';
        i++;
    });
}

function deletePollVar(event) {
    var p = event.target.parentElement.remove();
    loopThroughPollVs();
}

function delPoll() {
    document.getElementById("moment-polls-wrapper").style.visibility = "hidden";
    j('#addPoll').parentElement.style.display = null;
    // j('#addPoll').style.visibility = 'visible';
}

function addPoll() {
    // j('#addPoll').style.visibility = 'hidden';
    j('#addPoll').parentElement.style.display = 'none';
    document.getElementById("moment-polls-wrapper").style.visibility = 'visible';
    document.getElementById("poll-v1").focus();
    var fmc = document.querySelector('.form-main-container');
    fmc.scroll(0, fmc.scrollHeight);
}

function previewMedia(event) {
    /* old version
    var sender = event.target;
    var bigPreview = j('#imgPreviewBig');
    let buf = bigPreview.getAttribute('src');
    bigPreview.setAttribute('src', sender.getAttribute('src'));
    sender.setAttribute('src', buf); */
    
    var sender = event.target
    var bigPreview = j('#imgPreviewBig');
    bigPreview.setAttribute('src', sender.getAttribute('src'));
}

function _clSet(cl, b, sp) {
    let persRect = sp.getBoundingClientRect();
    // let halfPersLeft = Math.floor(persRect.width / 2);
    let x1 = b.offsetLeft;
    let x2 = sp.offsetLeft + Math.floor(persRect.width / 2);

    if (x1 > x2) {
        cl.classList.remove('pers-conn-line-left')
        cl.style.left = x2 + 'px';
        cl.style.width  = (x1 - x2) + 'px';
    } else {
        cl.classList.add('pers-conn-line-left')
        cl.style.left = x1 + 'px';
        cl.style.width  = (x2 - x1) + 'px';
    }
    cl.style.top  = (b.offsetTop + 4) + 'px';
    cl.style.height = (sp.offsetTop - b.offsetTop) + 'px';


    // cl.style.left = (sp.offsetLeft + halfPersLeft) + 'px';
    // cl.style.top  = (b.offsetTop + 4) + 'px';
    // cl.style.height = (sp.offsetTop - b.offsetTop) + 'px';
    // cl.style.width  = (b.offsetLeft - sp.offsetLeft - halfPersLeft) + 'px';
}

function adjustGallery() {
    let gItems = momentsGallery.querySelectorAll('.gallery-item');
    if (gItems.length > 0) {
        // l(gItems.length);
        if (((gItems.length + 1) * 70 + 20) > momentsGallery.offsetWidth) {
            l('adjustGallery: меняю на flex-start')
            momentsGallery.style.justifyContent = 'flex-start';
        } else {
            l('adjustGallery: меняю на center')
            momentsGallery.style.justifyContent = 'center';
        }
    }
}


function momentAddPerson(event) {
    var imgs = [];
    // if (j('#imgPreviewBig').style.display != 'none') {
    //     imgs.push(j('#imgPreviewBig'));
    // }
    var imgsSmall = document.querySelectorAll('.gallery-img-wrap');
    if (imgsSmall.length > 0) {
        imgsSmall.forEach(function(item, index) {
            imgs.push(item.querySelector('img'));
        })
    }
    if (imgs.length > 0) {
        addPersonGalleryBackup = divAddPersonGallery.innerHTML;
        slidePreviews = divAddPersonGallery.querySelectorAll('img.slide-preview')
        // divAddPersonGallery.innerHTML = '';
        imgs.forEach(function(item, index) {
            if (_slideExists(item.src) < 0) {
                divAddPersonGallery.appendChild(_apMakeSlide(item.src));
            }
        })
        j('#popAddPerson').style.bottom = 0;
    }
}

function momentAddPersonHide(e, accepted) {
    if (accepted == false) {
        // l('Canceled')
        divAddPersonGallery.innerHTML = addPersonGalleryBackup;
    }
    j('#popAddPerson').style.bottom = '-120%';
}

function _apMakeSlide(imgSrc, index) {
    // var divAddPersonGallery = j('#add-person-gallery');

    var divSlideWrap = document.createElement('div');
    divSlideWrap.classList.add('slide-wrap');
    // divAddPersonGallery.appendChild(divSlideWrap);

    var divSlideNumber = document.createElement('div');
    divSlideNumber.classList.add('slide-number');
    divSlideNumber.innerHTML = (index === undefined) ? _nextSlideNumber() : index;
    divSlideWrap.appendChild(divSlideNumber);

    var imgSlidePreview = document.createElement('img');
    imgSlidePreview.classList.add('slide-preview');
    imgSlidePreview.setAttribute('onclick', 'addPersonOnClick(event)');
    if (imgSrc != '') {
        imgSlidePreview.src = imgSrc;
    }
    divSlideWrap.appendChild(imgSlidePreview);
    return divSlideWrap;
}

function addPersonOnClick(e) {
    var x = e.clientX;
    var y = e.clientY;

    // если клик за пределами слайда, то не реагировать
    var par = e.target.parentElement;
    var slidePreviewRect = par.querySelector('img.slide-preview');

    if (!_apCheckMouseInBounds(e, slidePreviewRect.getBoundingClientRect())) {
        return;
    }
    let parRect = par.getBoundingClientRect();
    var b = _apMakeBulb(e);
    
    b.style.left = (x - parRect.x) + "px";
    b.style.top = (y - parRect.y) + "px";
    b.id = 'bulb' + lastPersonId;
    par.appendChild(b);
    
    var sp = _apMakeSlidePerson(e);
    sp.id = 'slide-person-' + lastPersonId;
    par.appendChild(sp);
    
    var cl = _apMakeConnLine(e);
    _clSet(cl, b, sp);
    cl.id = 'conn-line-' + lastPersonId;
    par.appendChild(cl);

    lastPersonId++;
    sp.click();
}

function videoclick(v) {
    // l('video clicked ')
    showPreview(v)
}

function videoplay(v) {
    l('in videoplay()')
    let vids = document.querySelectorAll('video');
    vids.forEach(function (item, index) {
        if (v.id != item.id) {
            item.pause();
            item.currentTime = 0;
        }
    })
}

function countImgs() {
    let imgs = document.querySelectorAll('.gallery-img-wrap');
    return imgs.length;
}

/* upload validation */

var validImgs = ['jpg', 'jpeg', 'bmp', 'png'];
var validVids = ['mp4', 'avi'];

function checkFileExt(input) {
    let ext = input.value.split('.').pop();
    if (validImgs.includes(ext.toLowerCase())) {
        return 'img';
    } else {
        if (validVids.includes(ext.toLowerCase())) {
            return 'vid';
        }
    }
    return '';
}

function showPersons(e) {
    searchDivWrapper.style.display = 'flex';
}

function hidePersons(e) {
    if (searchInput.value.length < 3) {
        searchDivWrapper.style.display = 'none';
        searchDivWrapper.style.boxShadow = 'none';
    }
}

function searchDivOnInput(e) {
    searchDiv.innerHTML = ''
    let str = searchInput.value;
    if (str.length < 3) {
        return
    }
    let searchRes = searchPersons(str, personsList);
    if (searchRes.length > 0) {
        searchRes.forEach(element => {
            searchDiv.appendChild(_apMakeFoundPerson(element));
        })
        searchDivWrapper.style.boxShadow = '0 0 1px 2px #0000003b';
    }
}

function slidePersonOnClick(e) {
    let pers = e.currentTarget;

    // снять выделение со всех других
    document.querySelectorAll('.slide-person-active').forEach(element => {
        element.classList.remove('slide-person-active');
    })
    pers.classList.add('slide-person-active');
    searchInput.focus();
}

function _slideExists(src) {
    res = -1
    slidePreviews.forEach(function(item, index) {
        if (item.src == src) {
            res = index
        }
    })
    return res
}

function _nextSlideNumber() {
    var sw = jj('.slide-wrap')
    return (sw === null) ? 11 : (sw.length + 1)

}



/* MOVE_PERSON */

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
    if (mousedown && _apCheckMouseInBounds(e, targetSlide.getBoundingClientRect())) {
        bulbToMove.style.left = e.clientX + x + 'px';
        bulbToMove.style.top = e.clientY  + y + 'px';
        _clSet(connLineToMove, bulbToMove, slidePersonToConnect);
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
    if (touched && e.touches.length === 1 && _apCheckTouchInBounds(e, targetSlide.getBoundingClientRect())) {
        let touch = e.touches[0];
        bulbToMove.style.left = (targetStartX + touch.clientX - touchStartX) + 'px';
        bulbToMove.style.top  = (targetStartY + touch.clientY - touchStartY) + 'px';
        _clSet(connLineToMove, bulbToMove, slidePersonToConnect);
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
    sp.setAttribute('onclick', 'slidePersonOnClick(event)');
    // ToDo sp.setAttribute('onclick', '');
    return sp;
}

function _apCheckMouseInBounds(e, rect) {
    let res = false;
    if (e.clientX > rect.left && e.clientX < (rect.left + rect.width)) {
        if (e.clientY > rect.top && e.clientY < (rect.top + rect.height)) {
            res = true;
        }
    }
    return res;
}

function _apCheckTouchInBounds(e, rect) {
    let res = false;
    let touch = e.touches[0];
    if (touch.clientX > (rect.left + 6) && touch.clientX < (rect.left + rect.width - 6)) {
        if (touch.clientY > (rect.top + 6) && touch.clientY < (rect.top + rect.height - 6)) {
            res = true;
        }
    }
    return res;
}









/* SEARCH_PERSONS */

var personsList = [
    {
        id: 0,
        fio: 'Алиев Ризван Саид-Магомедович',
        avatar: '../../img/settings-img.png',
        born: '12.11.2001'
    },
    {
        id: 1,
        fio: 'Бадиев Адам Алиханович',
        avatar: '../../img/lk/Ellipse 4.png',
        born: '01.10.1933'
    },
    {
        id: 2,
        fio: 'Накостоев Артур Хавашевич',
        avatar: '../../img/post/Rectangle 10.png',
        born: '05.01.1985'
    },
    {
        id: 3,
        fio: 'Алтамиров Абдулла Магомедович',
        avatar: '../../img/teip-profile/Ellipse 56.png',
        born: '15.05.1964'
    },
    {
        id: 4,
        fio: 'Сукиев Джамал Русланович',
        avatar: '../../img/chat-car.jpg',
        born: '24.01.1999'
    },
    {
        id: 5,
        fio: 'Евлоев Ахмед Шарпуддинович',
        avatar: '../../img/chat-car.jpg',
        born: '12.12.1977'
    },
    {
        id: 6,
        fio: 'Зурабов Магомед-Башир Асланович',
        avatar: '../../img/Rectangle 10.png',
        born: '01.04.2005'
    }
];

function searchPersons(str, list) {
    let res = []
    if (str === '' || str === null || list === null) {
        console.log('Строка пустая или список имен пуст')
        return res;
    }

    if (list.length == 0) {
        console.log('Список имен пуст')
        return res;
    }
    list.forEach(element => {
        if (element.fio.toLowerCase().indexOf(str.toLowerCase()) >= 0) {
            res.push(element);
        }
    });
    if (res.length == 0) {
        console.log('Результаты поиска пустые')
    }
    return res;
}


function _apMakeFoundPerson(persObj, onclickAsAttr = 'foundPersonOnClick(event);') {
    let persWrap = document.createElement('div');
    persWrap.classList.add('pers-list-wrapper');
    persWrap.classList.add('s-flex');
    // persWrap.setAttribute('onclick', 'foundPersonOnClick(event);');
    persWrap.setAttribute('onclick', onclickAsAttr);
    persWrap.setAttribute('data-userid', persObj.id);

    let img = document.createElement('img');
    img.setAttribute('alt', '')
    if (persObj.avatar !== null) {
        img.src = 'https://gargalo.ru' + persObj.avatar;
    }

    let persBody = document.createElement('div')
    persBody.classList.add('pers-list-body')
    persBody.classList.add('s-flexCol')

    let persFIO = document.createElement('div')
    persFIO.classList.add('pers-list-fio')
    persFIO.classList.add('wide')
    if (persObj.fio !== null) {
        persFIO.innerHTML = persObj.fio
    }

    let persBirth = document.createElement('div')
    persBirth.classList.add('pers-list-birthdate')
    persBirth.classList.add('wide')
    if (persObj.born !== null) {
        persBirth.innerHTML = persObj.born
    }

    persWrap.appendChild(img)
    persWrap.appendChild(persBody)
    persBody.appendChild(persFIO)
    persBody.appendChild(persBirth)

    return persWrap
}

function foundPersonOnClick(e) {
    // l('Clicked on found person: ')
    let persWrap = e.currentTarget;
    if (!persWrap.classList.contains('pers-list-wrapper')) {
        return
    }
    let Pers = {
        id: persWrap.getAttribute('data-userid'),
        fio: persWrap.querySelector('.pers-list-fio').innerHTML,
        avatar: persWrap.querySelector('img').src,
        born: persWrap.querySelector('.pers-list-birthdate').innerHTML
    }
        
    let persActive = j('.slide-person-active');
    if (persActive !== null) {
        persActive.src = Pers.avatar;
        persActive.setAttribute('data-userid', Pers.id)
    }
    clearSearch();
}

function clearSearch() {
    searchInput.value = '';
    hidePersons();
    searchDiv.innerHTML = ''
}











/* SETTINGS */

var momentSettingsBackup = {
    canView: '',
    viewExceptions: '',

    canComment: '',
    commentExceptions: ''

    // Использование объекта:
    // если viewExceptions != '', значит берем челов из .moment-settings-exceptions
    // иначе смотрим, что в canView {'look-all', 'look-subs', 'look-relatives'}.
    // А если и canView == '', значит никто не может смотреть.
    // Кстати, если никто не видит, то зачем настройки комментирования?
}

var momentSettings = j('#popMomentSettings')

var momsetGroupLook    = jj('.moment-settings-input-group')[0]
var momsetGroupComment = jj('.moment-settings-input-group')[1]
var momsetRowsLook    = momsetGroupLook.querySelectorAll('.moment-settings-row')
var momsetRowsComment = momsetGroupLook.querySelectorAll('.moment-settings-row')
var momsetRowsALL = document.querySelectorAll('.moment-settings-row')

var exceptionCheckboxLook    = j('#look-all-except')
var exceptionCheckboxComment = j('#comment-all-except')
var momsetExceptionsLook    = momsetGroupLook.querySelector('.moment-settings-exceptions')
var momsetExceptionsComment = momsetGroupComment.querySelector('.moment-settings-exceptions')

var listenCheckboxOnChange = true
var momsetSearchDivWrapper = j('#moment-settings-search-wrapper')
var momsetSearchDiv = j('#moment-settings-search')
var momsetActiveExceptions = jj('.moment-settings-exceptions')[0]

jj('.moment-settings-exception-X').forEach(element => {
    element.setAttribute('onclick', 'momsetExceptionXOnClick(event)')
});
jj('.moment-settings-exceptions').forEach(el => {
    let inp = el.querySelector('input')
    el.addEventListener('click', function() {
        momsetFocusOnInput(inp)
    }, true)
    inp.setAttribute('oninput', 'momsetSearchPersonOnInput(event, this)')
})

strengthenCheckedRows()
momsetAddEvents()

function showMomentSettings(event) {
    // momentSettingsBackup = momentSettings.innerHTML;
    // Это плохой способ бэкапа, DOM-привязки сбиваются
    backupMomentSettings()
    momentSettings.style.bottom = 0
}

function momentSettingsHide(e, accepted) {
    if (accepted == false) {
        // momentSettings.innerHTML = momentSettingsBackup;
        // Это плохой способ бэкапа, DOM-привязки сбиваются
        restoreMomentSettings()
    }
    momentSettings.style.bottom = '-120%'
}

function momsetAddEvents() {
    momsetRowsALL.forEach(element => {
        // element.setAttribute('onclick', 'momsetRowOnClick(event, this)')
        element.querySelector('input').setAttribute('onchange', 'momsetCheckboxOnChange(event)')
    })
}

function momsetCheckboxOnChange(event) {
    checkboxSender = event.target.parentElement.querySelector('input')
    if (listenCheckboxOnChange) {
        momsetToggleBoxes(event, checkboxSender)
    }
}

function momsetCheckboxToggle(event, checkboxSender) {
    checkboxSender.checked = !checkboxSender.checked
}

function momsetToggleBoxes(event, checkboxSender) {
    var parentGroup = checkboxSender.parentElement.parentElement
    if (!parentGroup.classList.contains('moment-settings-input-group')) {
        console.log('Не нашел div .moment-settings-input-group')
        return
    }
    var inputs = parentGroup.querySelectorAll('input')

    if (!checkboxSender.checked) {
        // inputs[0].checked = true
    } else {
        inputs.forEach(element => {
            if (element != checkboxSender) {
                element.checked = false
            }
        });
    }
    
    strengthenCheckedRows()
    exceptionsVisibilityCheck()
}

function strengthenCheckedRows() {
    // l('strengthen rows')
    momsetRowsALL.forEach(row => {
        row.classList.remove('checked-row')
        if (row.querySelector('input').checked) {
            row.classList.add('checked-row')
        }
    })
}

function exceptionsVisibilityCheck() {
    if (exceptionCheckboxLook.checked) {
        momsetExceptionsLook.style.display = 'flex'
    } else {
        momsetExceptionsLook.style.display = 'none'
    }

    if (exceptionCheckboxComment.checked) {
        momsetExceptionsComment.style.display = 'flex'
    } else {
        momsetExceptionsComment.style.display = 'none'
    }
}

function backupMomentSettings() {
    if (exceptionCheckboxLook.checked) {
        momentSettingsBackup.viewExceptions = momsetExceptionsLook.innerHTML
    } else {
        momentSettingsBackup.canView = _momsetCheckedInputID(momsetGroupLook)
    }

    if (exceptionCheckboxComment.checked) {
        momentSettingsBackup.commentExceptions = momsetExceptionsComment.innerHTML
    } else {
        momentSettingsBackup.canComment = _momsetCheckedInputID(momsetGroupComment)
    }
}

function restoreMomentSettings() {
    listenCheckboxOnChange = false
    momentSettings.querySelectorAll('input').forEach(input => {
        input.checked = false
    })
    listenCheckboxOnChange = true

    if (momentSettingsBackup.viewExceptions != '') {
        exceptionCheckboxLook.checked = true
        momsetExceptionsLook.innerHTML = momentSettingsBackup.viewExceptions
    } else {
        if (momentSettingsBackup.canView != '') {
            momsetGroupLook.querySelector('input#' + momentSettingsBackup.canView).checked = true
        }
    }

    if (momentSettingsBackup.commentExceptions != '') {
        exceptionCheckboxComment.checked = true
        momsetExceptionsComment.innerHTML = momentSettingsBackup.commentExceptions
    } else {
        if (momentSettingsBackup.canComment != '') {
            momsetGroupComment.querySelector('input#' + momentSettingsBackup.canComment).checked = true
        }
    }

    strengthenCheckedRows()
    exceptionsVisibilityCheck()
}

function _momsetCheckedInputID(inputGroup) {
    // check, which input of group is checked, & return ID
    // if none, return ''
    var res = ''
    inputGroup.querySelectorAll('input').forEach(input => {
        if (input.checked) {
            res = input.id
        }
    })
    return res
}

function momsetExceptionXOnClick(event) {
    event.target.parentElement.remove()
}

function momsetFocusOnInput(input) {
    input.focus()
}

function momsetSearchPersonOnInput(event, sender) {
    // Переделать под сервер

    momsetActiveExceptions = findParentRecursive(sender, '.moment-settings-exceptions', 8)
    momsetSearchDivWrapper.style.display = null
    momsetSearchDivWrapper.style.left = '12px'
    momsetSearchDivWrapper.style.top  = (sender.getBoundingClientRect().top + 40) + 'px'
    momsetSearchDiv.innerHTML = ''
    let str = sender.value;
    if (str.length < 3) {
        return
    }
    let searchRes = searchPersons(str, personsList);
    if (searchRes.length > 0) {
        searchRes.forEach(element => {
            momsetSearchDiv.appendChild(_apMakeFoundPerson(element, 'momsetFoundPersonOnClick(event)'));
        })
        momsetSearchDivWrapper.style.boxShadow = '0 0 1px 2px #0000003b';
    }
}

function momsetFoundPersonOnClick(e) {
    let persWrap = e.currentTarget;
    if (!persWrap.classList.contains('pers-list-wrapper')) {
        return
    }
    let Pers = {
        id: persWrap.getAttribute('data-userid'),
        fio: persWrap.querySelector('.pers-list-fio').innerHTML,
        avatar: persWrap.querySelector('img').src,
        born: persWrap.querySelector('.pers-list-birthdate').innerHTML
    }

    _msMakeExceptionPerson(Pers)
    momsetClearSearch(momsetActiveExceptions.querySelector('input'));
}


function momsetClearSearch(searchInput) {
    searchInput.value = '';
    momsetHidePersons(searchInput);
    momsetSearchDiv.innerHTML = ''
}


function momsetHidePersons(searchInput) {
    if (searchInput.value.length < 3) {
        momsetSearchDivWrapper.style.display = 'none';
        momsetSearchDivWrapper.style.boxShadow = 'none';
    }
}

function _msMakeExceptionPerson(persObj) {
    let excWrap = momsetActiveExceptions.querySelector('.moment-settings-exceptions-container')
    
    let exc = document.createElement('div')
    exc.classList.add('moment-settings-exception')
    exc.innerHTML = persObj.fio

    let excX = document.createElement('div')
    excX.classList.add('moment-settings-exception-X')
    excX.setAttribute('onclick', 'momsetExceptionXOnClick(event)')
    excX.innerHTML = 'X'
    exc.appendChild(excX)

    excWrap.insertBefore(exc, excWrap.querySelector('input'))
}


/* MOMENTS_COLLECT_AND_SEND */



// main collecting func
function momPublishOnClick(event) {
    // var txtarMomentDesc = j('#txtarMomentDesc')
    // var divPollsWrapper = j('#moment-polls-wrapper')
    // var divPollVsContainer = j('#moment-pollvs-container')
    // var pollVs = divPollVsContainer.querySelectorAll('input')
    var myForm = j('#formMoment')
    var fd = null
    var marksArr = []

    // var mContent = ''
    var votes = []
    var props = {
        "width": null,
        "height": null
    }
    // if (txtarMomentDesc.style.display != 'none') {
    //     mContent = txtarMomentDesc.value
    // }
    // if (divPollsWrapper.style.visibility != 'hidden') {
    //     pollVs.forEach(pollV => {
    //         votes.push(pollV.value)
    //     })
    // }
    props.width = j('img.slide-preview').offsetWidth
    props.height = j('img.slide-preview').offsetHeight
    marksArr = collectAllMarks()
    // l(marksArr)

    fd = new FormData(myForm)
    fd.append('marked_users', marksArr)
    fd.append('proportions', props)
    // fd.append('content', mContent)
    fd.append('votes', votes)
    
    // $('.loaded-progress-window').show()
    // e.preventDefault();
    // var formElement = document.querySelector("#send-form");
    // var formData = new FormData(formElement);
    
    var request = new XMLHttpRequest();
    
    request.upload.onprogress = function(event) {
        // percent = Math.floor((event.loaded*100)/event.total)
        // //console.log('Загружено ' + event.loaded + ' из ' + event.total);
        // progress.css('width', percent+'%')
        // uploaded.text(percent+'%')
    }
    request.onload = function() {
      if (request.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${request.status}: ${request.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        // $('.loaded-progress-window').hide()
        // $('#mask1').click()
        // importPage('/pages/home/index.html')					
      }
    };
    
    request.open("POST", "https://gargalo.ru/api/wall/store", true);
    request.setRequestHeader('Authorization', 'Bearer '+user.token);
    request.send(fd);
}

function collectMark(imgSlidePerson, divPersBulb) {
    // imgSlidePerson - это большой кружок с отмеченным челом
    // divPersBulb - это маленький кружок - сама отметина чела
    let res = {
        "user_id": null,
        "left": null,
        "top": null
    }
    if (imgSlidePerson.getAttribute('data-userid') !== null) {
        res.user_id = imgSlidePerson.getAttribute('data-userid')
        res.left = divPersBulb.offsetLeft
        res.top = divPersBulb.offsetTop
    }
    return res
}

function collectMarksFor1Img(divSlideWrap) {
    /// Что будем делать с пустыми отметками? Поставил отметину,
    /// но забыл выбрать чела
    // Пустые отметины скорее всего удаляются по нажатию
    // на кнопку Отметить в выборе отметок

    let res = []
    let personsHere = divSlideWrap.querySelectorAll('.slide-person')
    if (personsHere != null) {
        personsHere.forEach(elem => {
            res.push(
                collectMark(elem, elem.parentElement.querySelector('.pers-bulb'))
            )
        })
    }
    return res
}

function collectAllMarks() {
    // Надо пробежаться по всем слайдам
    let res = []
    let allSlideWraps = document.querySelectorAll('.slide-wrap')
    allSlideWraps.forEach(elem => {
        res.push(collectMarksFor1Img(elem))
    })
    return res
}