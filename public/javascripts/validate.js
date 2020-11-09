const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const make_regex= /\b[a-z]+\b/g;

function validate_first_name(name) {
    return validate_not_empty_string(name);
}

function validate_phone_number(number) {
    return validate_not_empty_string(number);
}

function validate_last_name(name) {
    return validate_not_empty_string(name);
}

function validate_not_empty_string(name) {
    return name != null && name.length > 0;
}

function validate_location(location) {
    return validate_not_empty_string(location);
}

function validate_email(email) {
    return validate_not_empty_string(email) && email_regex.test(email.toLowerCase())
}

/*
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/

function validate_password(password) {
    return validate_not_empty_string(password) && password_regex.test(password);
}

function validate_vehicle_speed(speed) {
    return parseInt(speed) > 0;
}

function validate_vehicle_number_of_doors(number_of_doors) {
    return number_of_doors > 0;
}

function validate_vehicle_age(age) {
    return age >= 0;
}

function validate_vehicle_luggage(l) {
    return l >= 0;
}


function validate_vehicle_price_per_day(price_per_day) {
    return price_per_day >= 0;
}
function validate_vehicle_make(make){
    return make_regex.test(make);
}
function validate_vehicle_horespower(hp){
    return /\b[0-9]+\b/.test(hp) && parseInt(hp)>0;
}
function validate_acceleration(time){
    return /\b([0-9]+.[0-9]+|[0-9]+,[0-9]+|[0-9]+)\b/.test(time);
}
function validate_vehicle_doors_seats(speed) {
    return parseInt(speed) > 0 && parseInt(speed)<7;
}
function validate_vehicle_price_per_day(price){
    return parseInt(price) > 0 && parseInt(price)<5000;
}
function validate_phone(phone){
    return /\b[0-9]+\b/.test(phone);
}

function validate_dates(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    return date2>=date1;
}

let formPublish=document.getElementById("list-your-car");

formPublish["typeoffuel"].addEventListener("change", function(){
    formPublish["consumption"].disabled=true;
});

formPublish.addEventListener("submit", function(dogodek){
    writeError=false;
    errors="";
    console.log(formPublish["make"].value);
    if( !validate_vehicle_make(formPublish["make"].value) ){
        formPublish["make"].classList.add("alert-danger");
        errors+="Make should have only letters.\n";
        writeError=true;
    }
    if(!validate_not_empty_string(formPublish["model"].value)){
        formPublish["model"].classList.add("alert-danger");
        errors+="Model text field should not be let empty.\n";
        writeError=true;
    }
    if(!validate_vehicle_horespower(formPublish["hp"].value) ){
        formPublish["hp"].classList.add("alert-danger");
        errors+="Horespower should be only numbers.\n";
        writeError=true;
    }    
    if(!validate_vehicle_speed(formPublish["maxspeed"].value) ){
        formPublish["maxspeed"].classList.add("alert-danger");
        errors+="Maxspeed should be only numbers.\n";
        writeError=true;
    }
    if(!validate_acceleration(formPublish["acceleration"].value) ){
        formPublish["acceleration"].classList.add("alert-danger");
        errors+="Acceleration should be written in the next format => number.number or just a number(s).\n";
        writeError=true;
    }
    if(!validate_not_empty_string(formPublish["consumption"].value) && formPublish["consumption"].disabled==false ){
        formPublish["consumption"].classList.add("alert-danger");
        errors+="Consumption field must not be empty, except if the vehicle is electrix\n";
        writeError=true;
    }
    if(!validate_vehicle_doors_seats(formPublish["seats"].value)){
        formPublish["seats"].classList.add("alert-danger");
        errors+="Number of seats is only one number.\n";
        writeError=true;
    }
    if(!validate_vehicle_doors_seats(formPublish["doors"].value)){
        formPublish["doors"].classList.add("alert-danger");
        errors+="Number of doors is only one number.\n";
        writeError=true;
    }
    if(!validate_vehicle_price_per_day(formPublish["price"].value)){
        formPublish["price"].classList.add("alert-danger");
        errors+="Price must be between 1 and 5000.\n";
        writeError=true;
    }
    if(!validate_phone(formPublish["number"].value)){
        formPublish["number"].classList.add("alert-danger");
        errors+="Phone number must have only numbers and an optional + at the beginning.\n";
        writeError=true;
    }

    
    if(writeError){
        alert(errors);
        dogodek.preventDefault();
    }

    
});