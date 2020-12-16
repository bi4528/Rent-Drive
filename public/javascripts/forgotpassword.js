var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    var mail = document.getElementById("mail").value;
    if (!validate_email(mail)) {
        alertMessage("E-mail not valid!");
        event.preventDefault();
    }
    if(event.returnValue){
        // todo: send email via API
    }
});

function alertMessage(message) {
    /*var alert = document.getElementById("alert");
    alert.hidden = false;
    alert.childNodes[1].innerHTML = message;
    $(".alert-dismissible").fadeTo(1500, 500).slideUp(500);*/
    alert(message);
}

document.getElementById("mail").addEventListener("change", function (event) {
    if (!validate_email(this.value)) {
        alertMessage("E-mail not valid!");
    }
});