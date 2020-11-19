var form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    var mail = document.getElementById("mail").value;
    var password = document.getElementById("password").value;
    console.log(mail, password);
    if (!validate_email(mail)) {
        alertMessage("Wrong password or mail!");
        event.preventDefault();
    } else
    if (!validate_password(password)) {
        alertMessage("Wrong password or mail!");
        event.preventDefault();
    }else 
    form.submit();
    //console.log(event.returnValue);
    //return password;
});

function alertMessage(message) {
    var alert = document.getElementById("alert");
    alert.hidden = false;
    alert.childNodes[1].innerHTML = message;
    $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);
}