const usernameRx = /^(?=.{4,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
function validate_username(username){
    return usernameRx.test(username);
}
var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    var username = document.getElementById("username").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeat-password").value;

    if (!validate_username(username)) {
        alertMessage("Username not valid!");
        event.preventDefault();
    }
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

document.getElementById("username").addEventListener("change", function (event) {
    if (!validate_username(this.value)) {
        alertMessage("Username not valid!");
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