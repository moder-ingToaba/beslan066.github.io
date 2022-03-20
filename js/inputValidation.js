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
});

function validatePhone() {
    var val = this.value;
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val)) {
        this.style.backgroundColor = "#c4f9cc70";
    } else {
        this.style.backgroundColor = "rgba(242, 12, 12, 0.14)";
    }
}

function validateEmail() {
    var val = this.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
        this.style.backgroundColor = "#c4f9cc70";
    } else {
        this.style.backgroundColor = "rgba(242, 12, 12, 0.14)";
    }
}
