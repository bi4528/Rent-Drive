function submit_button_clicked() {
    
    var form = document.querySelector("date-form");
    form.addEventListener("submit", function(event){
        var date1 = document.getElementById("date-from").value;
        var date2 = document.getElementById("date-to").value;
        
        if (!validate_dates(date1, date2)) {
            alert("Dates are not valid");
            event.preventDefault();
        }
        
    });
    document.getElementById("submit_form_button").click();
}


// calculate and display price if valid
document.getElementById("date-form").addEventListener("change",function(){
    var date1 = new Date (document.getElementById("date-from").value);
    var date2 = new Date (document.getElementById("date-to").value);
    var date1String = document.getElementById("date-from").value;
    var date2String = document.getElementById("date-to").value;
    if (date1String!=""){
        if (date1>date2) document.getElementById("date-to").value = date1String;
        document.getElementById("date-to").setAttribute("min",date1String);
        date1 = new Date (document.getElementById("date-from").value);
        date2 = new Date (document.getElementById("date-to").value);
    } 
    if (validate_dates(date1,date2)){
        var days = 1+(date2-date1)/86400000;
        var dailyPrice = document.getElementById("daily-price").innerHTML;
        dailyPrice = dailyPrice.substring(0,dailyPrice.length-1);
        var price = days * dailyPrice + "€";
        document.getElementById("price").innerHTML = price;
        document.getElementById("submit-button").disabled=false;;
    } else {
        document.getElementById("price").innerHTML = "";
        document.getElementById("submit-button").disabled=true;
    }
});

// favorite button
document.getElementById("favorite").addEventListener("click",function(){
    if (this.className =="far fa-heart"){
        this.className = "fas fa-heart";
    } else {
        this.className = "far fa-heart";
        //TODO: remove from favorite list
    }
});

function appendToForm (){
    var dateForm = document.getElementById("date-form");
    var dailyPrice = document.getElementById("daily-price");
    
    addHiddenInput(dateForm,dailyPrice.innerText,"daily-price")
    var phone = document.getElementsByClassName("contact-details")[0].innerText;
    var email = document.getElementsByClassName("contact-details")[1].innerText;
    var location = document.getElementsByClassName("contact-details")[2].innerText;
    var username = document.getElementsByClassName("blockquote-footer")[0].innerText;
    var vehicle_picture = document.getElementsByClassName("carousel-item")[0].children[0].getAttribute("src");
    var description = document.getElementsByClassName("blockquote")[0].children[0].innerText;
    addHiddenInput(dateForm,phone,"phone");
    addHiddenInput(dateForm,email,"email");
    addHiddenInput(dateForm,location,"location");
    addHiddenInput(dateForm,username,"username");
    addHiddenInput(dateForm,vehicle_picture,"vehicle_picture");
    addHiddenInput(dateForm,description,"description");
}

function addHiddenInput(form, string, inputName){
    var child = document.createElement('input');
    child.setAttribute("type", "hidden");
    child.setAttribute("name",inputName);
    child.setAttribute("value",string);
    form.appendChild(child);
}

function validate_dates(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    return date2>=date1;
}