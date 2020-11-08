

function save_button_clicked() {
    
    var form = document.querySelector("form");
    form.addEventListener("submit", function(event){
        var firstname = document.getElementsByName("firstname").innerText;
        var lastname = document.getElementsByName("lastname").innerText;
        var mail = document.getElementsByName("mail").innerText;
        var location = document.getElementsByName("location").innerText;
        var phone_number = document.getElementsByName("phone_number").innerText;
        
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
        if (!validate_location(location)) {
            alert("Location is not valid");
            event.preventDefault();
        }
        if (!validate_phone_number(phone_number)) {
            alert("Phone number is not valid");
            event.preventDefault();
        }
    });
    document.getElementById("submit_form_button").click();
}