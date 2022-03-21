// var wrongInputColor = "rgba(242, 12, 12, 0.14)";
var wrongInputColor = "rgba(242, 12, 12, 0.31)";
// var correctInputColor = "#c4f9cc70";
var correctInputColor = "rgb(180, 251, 191)";

var allInputs = document.getElementsByTagName("input");
Array.from(allInputs).forEach(function(input){
    switch(input.type) {
        case "email":
            input.addEventListener("input", validateEmail);
            break;
        case "tel":
            input.addEventListener("input", validatePhone);
            break;
    }
    if (input.classList.contains("inputValidateNames")) {
        input.addEventListener("input", validateNames);
    }
});

function validatePhone() {
    var val = this.value;
    if (/^[\+]*[7-8]{1}[9][0-9]{9}/.test(val)) {
        this.style.backgroundColor = correctInputColor;
    } else {
        this.style.backgroundColor = wrongInputColor;
    }
}

function validateEmail() {
    var val = this.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
        this.style.backgroundColor = correctInputColor;
    } else {
        this.style.backgroundColor = wrongInputColor;
    }
}

function validateNames() {
    var val = this.value;
    if (/^[1IА-Я][\-1IА-Яа-яЁё]*$/.test(val)) {
        this.style.backgroundColor = correctInputColor;
    } else {
        this.style.backgroundColor = wrongInputColor;
    }
}