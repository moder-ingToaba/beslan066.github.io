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