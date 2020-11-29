var deleteButtons = document.getElementsByClassName("delete");
var reviewers = [];
for (var i=0;i<deleteButtons.length;i++){
    console.log(deleteButtons.item(i).getAttribute("owner"));
    if (deleteButtons.item(i).getAttribute("owner")!=null) reviewers.push(deleteButtons.item(i).getAttribute("owner"))
}
var sessionUser = document.getElementById("sessionUser").innerText;
console.log(reviewers);
var loggedUserReviewIndex = reviewers.indexOf(sessionUser);
console.log(loggedUserReviewIndex);
if(loggedUserReviewIndex!=-1) document.getElementsByClassName("delete")[loggedUserReviewIndex].hidden=false;

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
    //debugger;
    addHiddenInput(dateForm,dailyPrice.innerText,"daily-price")
    var fullname = document.getElementById("fullname");
    if (fullname!=null) {
        fullname = fullname.innerText;
        var i = fullname.indexOf(' ');
        var firstname = fullname.substring(0, i);
        var lastname = fullname.substring(i);
        addHiddenInput(dateForm,firstname,"firstname");
        addHiddenInput(dateForm,lastname,"lastname");
    }
    var phone = document.getElementById("phone").innerText;
    var email = document.getElementById("email").innerText;
    var location = document.getElementById("location");
    if (location!=null) {
        location = location.innerText;
        addHiddenInput(dateForm,location,"location");
    }
    var username = document.getElementsByClassName("blockquote-footer")[0].innerText;
    var vehicle_picture = document.getElementsByClassName("carousel-item")[0].children[0].getAttribute("src");
    var description = document.getElementsByClassName("blockquote")[0].children[0].innerText;
    
    addHiddenInput(dateForm,phone,"phone");
    addHiddenInput(dateForm,email,"email");
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