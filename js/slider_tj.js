var touchdown = false
var touchX = null
var touchEndX = null
var touchedImg = null
// var imgWidth = 324
// var timeoutScrollIntoView = null

function initSlider1(){
    l('Initialising Slider1')
    touchdown = false
    touchX = null
    touchEndX = null
    touchedImg = null
    // imgWidth = 324

    document.querySelectorAll('.slide1-slide').forEach(slide1 => {
        slide1.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                return
            }
            let touch = e.touches[0]
            touchdown = true
            touchX = touch.clientX
            touchedImg = e.target
        })
    })

    window.addEventListener('touchend', function(e) {
        touchdown = false
        timeoutScrollIntoView = setTimeout(function() {
            slide1ScrollIntoView(touchedImg)
        }, 150)
    })

    window.addEventListener('touchmove', function(e) {
        if (touchdown) {
            touchEndX = e.touches[0].clientX
        }
    })
}

function slide1ScrollIntoView(senderImg) {
    if (senderImg == undefined || senderImg == null) {
        senderImg = touchedImg
    }
    let slideScroller = senderImg.parentElement.parentElement
    let slideWidth = senderImg.parentElement.offsetWidth
    let scrl = slideScroller.scrollLeft
    let floor_ = Math.floor(scrl / slideWidth)
    let index_ = floor_
    let leftie = scrl % slideWidth
    let coef = slideWidth / 3
    let slides = slideScroller.querySelectorAll('.slide1-cont')
    if (touchX > touchEndX) {
        // значит свайпнули влево
        // l('Свайп был влево')
        if (coef < leftie) {
            if ((slides.length - 1) > index_) {
                index_++
            }
        }
    } else {
        // значит свайпнули вправо
        // l('Свайп был вправо')
        // l('coef is ' + coef)
        // l('leftie is ' + leftie)
        // l('index_ is ' + index_)
        if ((coef * 2) < leftie) {
            if ((slides.length - 1) > index_) {
                index_++
            }
        }
    }
    // l('index is ' + index_)
    slideScroller.scrollLeft = index_ * slideWidth
}