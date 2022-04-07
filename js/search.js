
$('ul li').on('click', function(event) {
    event.preventDefault();
    
    $(this).addClass('active').siblings().removeClass('active');
})