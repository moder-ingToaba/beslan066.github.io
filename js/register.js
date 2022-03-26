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