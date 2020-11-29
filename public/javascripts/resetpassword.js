var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    var password = document.getElementById("password").value;
    var password_repeated = document.getElementById("password_repeated").value;

    if (password != password_repeated) {
        alertMessage("Passwords are not the same");
        event.preventDefault();
    }
    if (!validate_password(password)) {
        alertMessage("Password is not valid");
        event.preventDefault();
    }
    if (!validate_password(password_repeated)) {
        alertMessage("Password is not valid");
        event.preventDefault();
    }
});

function alertMessage(message) {
    var alert = document.getElementById("alert");
    if (alert != null) {
        alert.hidden = false;
        alert.childNodes[1].innerHTML = message;
        $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);
    }
}

document.getElementById("password").addEventListener("change", function (event) {
    if (!validate_password(this.value)) {
        alertMessage("Password not valid!");
    }
});