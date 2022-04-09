const tabsBtn = document.querySelectorAll(".tab__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item){
    item.addEventListener("click", function(){
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);
        if(! currentBtn.classList.contains('active')){
            tabsBtn.forEach(function(item){
                item.classList.remove('active');
            });
            tabsItems.forEach(function(item){
                item.classList.remove('active');
            });
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}
document.querySelector('.tab__nav-btn').click();