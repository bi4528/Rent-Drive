window.onload = function () {
    var form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        var mail = document.getElementById("mail");
        var password = document.getElementById("password");

        if (!validate_email(mail.value) || !validate_password(password.value)) {
            document.getElementById("error-message").innerHTML = "Email or password invalid! .";
            $("#modal").modal();
            mail.classList.add("alert-danger");
            password.classList.add("alert-danger");
            event.preventDefault();
        }
        //console.log(event.returnValue);
        //return password;
    });

    function alertMessage(message) {
        /*var alert = document.getElementById("alert");
        alert.hidden = false;
        alert.childNodes[1].innerHTML = message;
        $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);*/
        alert(message);
    }
}