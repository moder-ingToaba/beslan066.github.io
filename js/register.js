$(document).ready(function() {



    $(".reg-btn").click(function(e) {
        e.preventDefault()

        var    name = $("#nameField").val();
        var    secondName = $("#secondNameField").val();
        var    patronymic = $("#patronymic").val();
        var    family = $("#family").val();
        var    male = $("#male").val();
        var    dateInput = $('#date-input').val();


        console.log(name);

            if( name.trim() == "") {
                $('.error-block').css("display", "block");
                $('#nameField').css({
                    'border': '1px solid red',
                    'color': 'red',
                })
            } if(secondName == ""){
                $('.error-block').css("display", "block");
                $('#secondNameField').css({
                    'border': '1px solid red',
                    'color': 'red',
                })
            } if(patronymic == "") {
                $('.error-block').css("display", "block");
                $('#patronymic').css({
                    'border': '1px solid red',
                    'color': 'red',
                })
            } if(family == "") {
                $('.error-block').css("display", "block");
                $('#family').css({
                    'border': '1px solid red',
                    'color': 'red',
                })   
            } if(male == "") {
                $('.error-block').css("display", "block");
                $('#male').css({
                    'border': '1px solid red',
                    'color': 'red',
                })
            } if(dateInput == "") {
                $('.error-block').css("display", "block");
                $('#date-input').css({
                    'border': '1px solid red',
                    'color': 'red',
                })
            }
            else {
                $('.error-block').css("display", "none")
                window.location = '../auth/register-step-2.html';
            }
 
       

    });



});

console.log('fsajfk')

/*  Скрыть показать пароль */

$('.password-control').on('click', function(event){
    
    event.preventDefault()

    console.log('hello')
	if ($('#password-input').attr('type') == 'password'){
		$(this).addClass('view');
		$('#password-input').attr('type', 'text');
	} else {
		$(this).removeClass('view');
		$('#password-input').attr('type', 'password');
	}
	return false;
});



/* Забыли пароль(код) */




 let sendCode = $('.forg-pass-btn');
 
 sendCode.each(function() {
    sendCode.click(function(e) {
        e.preventDefault();
    
        const newPass = $("#password-input").val();
        const repNewPass = $("#repeat-new-pass").val();
    
        if(newPass == '') {
            $('#password-input').css("border", "1px solid red");
        }else {
            $('#password-input').css("border", "1px solid #CFE3E7");
        }
    
        if(repNewPass == '') {
            $('#repeat-new-pass').css("border", "1px solid red");
        }else {
            $('#repeat-new-pass').css("border", "1px solid #CFE3E7");
        }


        if(newPass !== repNewPass) {
            $('.error-block').css("display", "block");
        }else {
            window.location = '../auth/auth-modal.html'
        }
    
        return false;
 })
 

 })