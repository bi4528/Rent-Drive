

function save_button_clicked() {
    
    var form = document.querySelector("form");
    form.addEventListener("submit", function(event){
        var firstname = document.getElementsByName("firstname")[0].value;
        var lastname = document.getElementsByName("lastname")[0].value;
        var mail = document.getElementsByName("mail")[0].value;
        var location = document.getElementsByName("location")[0].value;
        var phone_number = document.getElementsByName("phone_number")[0].value;
        var password = document.getElementsByName("password")[0].value;
        
        if (!validate_first_name(firstname)) {
            alert("Firstname is not valid");
            event.preventDefault();
        }
        if (!validate_last_name(lastname)) {
            alert("Lastname is not valid");
            event.preventDefault();
        }
        if (!validate_email(mail)) {
            alert("Mail is not valid");
            event.preventDefault();
        }
        
        if (!validate_password(password)) {
            alert("Password is not valid. It must at least on uppercase and one lowercase character. It must be longer than 8 characters and it must contain a special character.");
            event.preventDefault();
        }
        
    });
    document.getElementById("submit_form_button").click();
}
