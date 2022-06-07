function showPreview(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var previewDiv = document.getElementById("divPreviewBig");
        var preview = document.getElementById("imgPreviewBig");
        preview.src = src;
        document.getElementById("lbUploadMedia").style.display = "none";
        previewDiv.style.display = null;
        document.getElementById("lbUploadMedia2").style.display = null;
    }
}

function addFileSmall(event) {
    if (event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var momentsGallery = document.getElementById("moments-gallery");
        var lbUploadMedia2 = document.getElementById("lbUploadMedia2");
        
        var divGalleryItem = document.createElement("div");
        divGalleryItem.classList.add("gallery-item");
        momentsGallery.insertBefore(divGalleryItem, lbUploadMedia2);
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
}

function addPoll() {
    document.getElementById("moment-polls-wrapper").style.visibility = null;
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