
var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeat-password").value;
    console.log(firstname, lastname, mail, password, repeatPassword);

    if (!validate_first_name(firstname)) {
        alertMessage("First name not valid!");
        event.preventDefault();
    }
    if (!validate_last_name(lastname)) {
        alertMessage("Last name not valid!");
        event.preventDefault();
    }
    if (!validate_email(mail)) {
        alertMessage("Mail is not valid");
        event.preventDefault();
    }
    if (!validate_password(password)) {
        alertMessage("Password is not valid");
        event.preventDefault();
    }
    if (password != repeatPassword) {
        alertMessage("Password is not valid");
        event.preventDefault();
    }
    console.log(event.returnValue);
});

function alertMessage(message) {
    var alert = document.getElementById("alert");
    alert.hidden = false;
    alert.childNodes[1].innerHTML = message;
    $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);
}

document.getElementById("firstname").addEventListener("change", function (event) {
    if (!validate_first_name(this.value)) {
        alertMessage("First name not valid!");
    }
});

document.getElementById("lastname").addEventListener("change", function (event) {
    if (!validate_first_name(this.value)) {
        alertMessage("Last name not valid!");
    }
});

document.getElementById("mail").addEventListener("change", function (event) {
    if (!validate_email(this.value)) {
        alertMessage("E-mail name not valid!");
    }
});

document.getElementById("password").addEventListener("change", function (event) {
    if (!validate_password(this.value)) {
        alertMessage("Password not valid!");
    }
});

document.getElementById("repeat-password").addEventListener("change", function (event) {
    if (!validate_password(this.value)) {
        alertMessage("Password not valid!");
    }
});

/*document.querySelector("form").addEventListener("change", function (event) {
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeat-password").value;
    if (password != repeatPassword) {
        console.log("not the same");
    } else if (validate_password(password)){
        console.log("good");
    } else {
        var alert = document.getElementById("alert");
        alert.hidden=false;
        alert.childNodes[1].innerHTML="Password not valid!";
        $(".alert-dismissible").fadeOut(2000);
    }
});*/