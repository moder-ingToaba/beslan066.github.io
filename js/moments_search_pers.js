var personsList = [
    {
        FIO: 'Алиев Ризван Саид-Магомедович',
        path: '../../img/settings-img.png',
        birth: '12.11.2001'
    },
    {
        FIO: 'Бадиев Адам Алиханович',
        path: '../../img/lk/Ellipse 4.png',
        birth: '01.10.1933'
    },
    {
        FIO: 'Накостоев Артур Хавашевич',
        path: '../../img/post/Rectangle 10.png',
        birth: '05.01.1985'
    },
    {
        FIO: 'Алтамиров Абдулла Магомедович',
        path: '../../img/teip-profile/Ellipse 56.png',
        birth: '15.05.1964'
    },
    {
        FIO: 'Сукиев Джамал Русланович',
        path: '../../img/chat-car.jpg',
        birth: '24.01.1999'
    },
    {
        FIO: 'Евлоев Ахмед Шарпуддинович',
        path: '../../img/chat-car.jpg',
        birth: '12.12.1977'
    },
    {
        FIO: 'Зурабов Магомед-Башир Асланович',
        path: '../../img/Rectangle 10.png',
        birth: '01.04.2005'
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
        if (element.FIO.toLowerCase().indexOf(str.toLowerCase()) >= 0) {
            res.push(element);
        }
    });
    if (res.length == 0) {
        console.log('Результаты поиска пустые')
    }
    return res;
}


function _apMakeFoundPerson(persObj) {
    let persWrap = document.createElement('div');
    persWrap.classList.add('pers-list-wrapper');
    persWrap.classList.add('s-flex');
    persWrap.setAttribute('onclick', 'foundPersonOnClick(event);');

    let img = document.createElement('img');
    img.setAttribute('alt', '')
    if (persObj.path !== null) {
        img.src = persObj.path;
    }

    let persBody = document.createElement('div')
    persBody.classList.add('pers-list-body')
    persBody.classList.add('s-flexCol')

    let persFIO = document.createElement('div')
    persFIO.classList.add('pers-list-fio')
    persFIO.classList.add('wide')
    if (persObj.FIO !== null) {
        persFIO.innerHTML = persObj.FIO
    }

    let persBirth = document.createElement('div')
    persBirth.classList.add('pers-list-birthdate')
    persBirth.classList.add('wide')
    if (persObj.birth !== null) {
        persBirth.innerHTML = persObj.birth
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
        FIO: persWrap.querySelector('.pers-list-fio').innerHTML,
        path: persWrap.querySelector('img').src,
        birth: persWrap.querySelector('.pers-list-birthdate').innerHTML
    }
    // l(e.currentTarget)
    // l(Pers)
    let persActive = j('.slide-person-active');
    if (persActive !== null) {
        persActive.src = Pers.path;
    }
    clearSearch();
}

function clearSearch() {
    searchInput.value = '';
    hidePersons();
    searchDiv.innerHTML = ''
}