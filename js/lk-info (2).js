document.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.querySelectorAll(".lk__info");
    const infoItem1 = document.querySelectorAll(".container__tabs");
    const infoItem2 = document.querySelectorAll(".tabs__lk");
    const infoItem3 = document.querySelectorAll(".lk-info");

    for (let i = 0; i < infoBtn.length; i++) {
        let item1 = infoItem1;
        let item2 = infoItem2;
        let item3 = infoItem3;
        infoBtn[i].addEventListener('click', () => {
            if(! infoItem1[i].classList.contains('active') && ! infoItem2[i].classList.contains('active')){
                item1[i].classList.add('active');
                item2[i].classList.add('active');
                item3[i].style.transform = `rotate(90deg)`;
                infoBtn[i].addEventListener('click', () => {
                    item1[i].classList.remove('active');
                    item2[i].classList.remove('active');
                    item3[i].style.transform = `rotate(270deg)`;
                })
            } else{
                infoBtn[i].addEventListener('click', () => {
                    item1[i].classList.add('active');
                    item2[i].classList.add('active');
                    item3[i].style.transform = `rotate(90deg)`;
                })
            }
        })
    }
});




