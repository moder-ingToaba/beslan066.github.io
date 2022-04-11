
$('ul li').on('click', function(event) {
    event.preventDefault();
    
    $(this).addClass('active').siblings().removeClass('active');
})



infoBtn.forEach(function(item) {
    item.addEventListener('click', function() {
        
    })
})