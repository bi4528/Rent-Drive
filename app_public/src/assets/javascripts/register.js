window.onload = function () {
    var form = document.querySelector("form");
    const password_error_message = "Password is not valid. Your password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character. It must be eight characters or longer.";
    form.addEventListener("submit", function (event) {
        var username = document.getElementById("username");
        var firstname = document.getElementById("firstname");
        var lastname = document.getElementById("lastname");
        var mail = document.getElementById("mail");
        var password = document.getElementById("password");
        var repeatPassword = document.getElementById("repeat-password");

       
        if (!validate_first_name(firstname.value)) {
            document.getElementById("error-message").innerHTML="First name not valid. Cannot contain numbers.";
            $("#modal").modal();
            firstname.classList.add("alert-danger");
            event.preventDefault();
        }
        if (!validate_last_name(lastname.value)) {
            document.getElementById("error-message").innerHTML="Last name not valid. Cannot contain numbers.";
            $("#modal").modal();
            lastname.classList.add("alert-danger");
            event.preventDefault();
        }
        if (!validate_email(mail.value)) {
            document.getElementById("error-message").innerHTML="Email not valid.";
            $("#modal").modal();
            mail.classList.add("alert-danger");
            event.preventDefault();
        }
        if (!validate_username(username.value)) {
            document.getElementById("error-message").innerHTML="Username not valid. Cannot contain spaces.";
            $("#modal").modal();
            username.classList.add("alert-danger");
            event.preventDefault();
        }
        if (!validate_password(password.value)) {
            document.getElementById("error-message").innerHTML=password_error_message;
            password.classList.add("alert-danger");
            $("#modal").modal();
            event.preventDefault();
        }
        if (!validate_password(repeatPassword.value)) {
            document.getElementById("error-message").innerHTML=password_error_message;
            repeatPassword.classList.add("alert-danger");
            $("#modal").modal();
            event.preventDefault();
        }
        if (password != repeatPassword) {
            document.getElementById("error-message").innerHTML="Passwords not matching!";
            $("#modal").modal();
            event.preventDefault();
        }
    });

    function alertMessage(message) {
        /*var alert = document.getElementById("alert");
        alert.hidden = false;
        alert.childNodes[1].innerHTML = message;
        $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);*/
        alert(message);
    }
}
