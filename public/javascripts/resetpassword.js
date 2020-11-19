var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    var pass = document.getElementById("password").value;
    console.log(pass);
    if (!validate_password(pass)) {
        alertMessage("Password not valid!");
        event.preventDefault();
    }
    console.log(event.returnValue);
    if(event.returnValue){
        // todo: send password via API
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