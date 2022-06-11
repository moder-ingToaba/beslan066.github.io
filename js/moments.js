function showPreview(event) {
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
}

function addFileSmall(event) {
    if (event.target.files.length > 0) {
        let ext = checkFileExt(event.target);
        if (ext == '') { return; }
        var src = URL.createObjectURL(event.target.files[0]);
        var momentsGallery = document.getElementById("moments-gallery");
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
                    previewMedia(event);
                });
                break;
            case 'vid':
                var divGalleryVidWrap = document.createElement("div");
                divGalleryVidWrap.classList.add("gallery-vid-wrap");
                divGalleryItem.appendChild(divGalleryVidWrap);
                var vid = document.createElement("video");
                vid.setAttribute('controls', 'controls');
                divGalleryVidWrap.appendChild(vid);
                var source = document.createElement("source");
                source.src = src;
                source.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
                vid.appendChild(source);
                vid.load();
                // vid.addEventListener('click', function(event) {
                //     previewMedia(event);
                // });
                break;
        }
        if (momentsGallery.getElementsByClassName("gallery-item").length > 8) {
            lbUploadMedia2.style.display = "none";
        }
    }
}

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
        ip.name = 'poll-v' + i.toString();
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
    var sender = event.target;
    var bigPreview = j('#imgPreviewBig');
    let buf = bigPreview.getAttribute('src');
    bigPreview.setAttribute('src', sender.getAttribute('src'));
    sender.setAttribute('src', buf);
}

function _clSet(cl, b, sp) {
    let persRect = sp.getBoundingClientRect();

    cl.style.left = (sp.offsetLeft + Math.floor(persRect.width / 2)) + 'px';
    cl.style.top  = (b.offsetTop + 4) + 'px';
    cl.style.height = (sp.offsetTop - b.offsetTop) + 'px';
    cl.style.width  = (b.offsetLeft - sp.offsetLeft - Math.floor(persRect.width / 2)) + 'px';
}