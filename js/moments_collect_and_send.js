var txtarMomentDesc = j('#txtarMomentDesc')
var divPollsWrapper = j('#moment-polls-wrapper')
var divPollVsContainer = j('#moment-pollvs-container')
var pollVs = divPollVsContainer.querySelectorAll('input')
var myForm = j('#formMoment')


var fd = null

var marksArr = []

var mContent = ''
var votes = []
var props = {
    "width": null,
    "height": null
}

// MAIN COLLECTING FUNC
function momPublishOnClick(event) {
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