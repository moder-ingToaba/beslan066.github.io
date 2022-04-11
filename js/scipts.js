/*  Кнопка подписаться */

$('.subscribe').click(function() {
        $('.subsc-text').replaceWith('<div class="subsc-true"><img src="img/Check.png" alt="">Вы подписаны</div>');
})

/*  Добавить Адрессата */

$('.add_adress').click(function() {
    $('.addressee__list').append('<input type="text">');
})

/*  Добавить вариант ответа */
    

$('.add-survey-btn').click(function() {
    $('.survey-select-items').append('<input type="text" placeholder="Вариант *">');
})


/* Табы */

const tabsBtn = document.querySelectorAll('.js-tab-trigger');
const tabsItems = document.querySelectorAll('.tab-items');

  
tabsBtn.forEach(function(item) {
    item.addEventListener('click', function() {


        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);

        tabsBtn.forEach(function(item) {
            item.classList.remove('active')
        })

        tabsItems.forEach(function(item) {
            item.classList.remove('active');
        })


        item.classList.add('active');
        currentTab.classList.add('active');
    })
})


/*  Регистрация */



window.onload=function(){
    const signBtn = document.querySelector('.sign-in');


    signBtn.addEventListener('click', function(event) {
        
        event.preventDefault();

        let loginField = document.getElementById('login-field').value;
        console.log(loginField);
        let passwordField = document.getElementById('pass-field').value;
        console.log(passwordField);
        let login = 'superAdmin@gmail.com';
        let password = 1234;



        if(loginField == login  && passwordField == password) {
            window.location= "/pages/home/index.html";
        }

    })
}

window.onload= function() {
    let sendComment = document.getElementsByClassName('.send__com');

    sendComment.addEventListener('click', function() {
        let commentFieldVal = document.getElementsByClassName('.send__input').value();

        console.log(commentFieldVal);
    })
}



