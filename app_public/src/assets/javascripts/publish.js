const { write } = require("fs");

const make_regex = /\b[a-z]+\b/i;
const word_regex = /\b[a-z || A-Z]+\b/;
const phone_regex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
const no_spaces = /^\S*$/;


function validate_phone_number(number) {
    return validate_not_empty_string(number) && phone_regex.test(number);
}

function validate_not_empty_string(name) {
    return name != null && name.length > 0;
}

function validate_location(location) {
    return validate_not_empty_string(location);
}

/*
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
*/

function validate_vehicle_speed(speed) {
    return parseFloat(speed) > 0;
}

function validate_vehicle_number_of_doors(number_of_doors) {
    return parseInt(number_of_doors) > 0 & /\b[0-9]+\b/.test(number_of_doors);
}

function validate_vehicle_age(age) {
    return age >= 0;
}

function validate_vehicle_luggage(l) {
    return parseFloat(l) >= 0;
}

function validate_vehicle_price_per_day(price_per_day) {
    return price_per_day >= 0;
}
function validate_vehicle_make(make) {
    return make_regex.test(make);
}
function validate_vehicle_horespower(hp) {
    return /\b[0-9]+\b/.test(hp) && parseFloat(hp) > 0;
}
function validate_acceleration(time) {
    return /\b([0-9]+.[0-9]+|[0-9]+,[0-9]+|[0-9]+)\b/.test(time);
}
function validate_vehicle_doors_seats(speed) {
    return parseInt(speed) > 0 && parseInt(speed) < 7 && /\b[0-9]+\b/.test(speed);
}
function validate_vehicle_price_per_day(price) {
    return parseFloat(price) > 0 && parseFloat(price) < 5000;
}
function validate_phone(phone) {
    return /\b[0-9]+\b/.test(phone);
}
function validate_dates(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    return date2 >= date1;
}
function validate_no_spaces(word) {
    return no_spaces.test(word);
}
function validate_city(city) {
    return validate_not_empty_string(city) && /\b([a-z]+|[a-z]+-[a-z]+)\b/i.test(city);
}



formPublish["typeoffuel"].addEventListener("change", function (dogodek) {
    if (formPublish["typeoffuel"].value == "Electric") {
        formPublish["consumption"].disabled = true;
    }
    else {
        formPublish["consumption"].disabled = false;
    }
});

window.onload = function () {

    formPublish.addEventListener("submit", function (dogodek) {
        writeError = false;
        errors = "";
        console.log(formPublish["make"].value);
        if (!validate_vehicle_make(formPublish["make"].value)) {
            formPublish["make"].classList.add("alert-danger");
            errors += "Make should have only letters.\n";
            writeError = true;
        }
        if (!validate_not_empty_string(formPublish["model"].value)) {
            formPublish["model"].classList.add("alert-danger");
            errors += "Model text field should not be let empty.\n";
            writeError = true;
        }
        if (!validate_vehicle_horespower(formPublish["hp"].value)) {
            formPublish["hp"].classList.add("alert-danger");
            errors += "Horespower should be only numbers.\n";
            writeError = true;
        }
        if (!validate_vehicle_speed(formPublish["maxspeed"].value)) {
            formPublish["maxspeed"].classList.add("alert-danger");
            errors += "Maxspeed should be only numbers.\n";
            writeError = true;
        }
        if (!validate_acceleration(formPublish["acceleration"].value)) {
            formPublish["acceleration"].classList.add("alert-danger");
            errors += "Acceleration should be written in the next format => number.number or just a number(s).\n";
            writeError = true;
        }
        if (!validate_acceleration(formPublish["consumption"].value) && formPublish["consumption"].disabled == false) {
            formPublish["consumption"].classList.add("alert-danger");
            errors += "Consumption field must not be empty, except if the vehicle is electrix\n";
            writeError = true;
        }
        if (!validate_vehicle_doors_seats(formPublish["seats"].value)) {
            formPublish["seats"].classList.add("alert-danger");
            errors += "Number of seats is only one number.\n";
            writeError = true;
        }
        if (!validate_vehicle_doors_seats(formPublish["doors"].value)) {
            formPublish["doors"].classList.add("alert-danger");
            errors += "Number of doors is only one number.\n";
            writeError = true;
        }
        if (!validate_vehicle_price_per_day(formPublish["price"].value)) {
            formPublish["price"].classList.add("alert-danger");
            errors += "Price must be between 1 and 5000.\n";
            writeError = true;
        }
        if (!validate_phone(formPublish["number"].value)) {
            formPublish["number"].classList.add("alert-danger");
            errors += "Phone number must have only numbers and an optional + at the beginning.\n";
            writeError = true;
        }
        if (!validate_vehicle_luggage(formPublish["luggage"].value)) {
            formPublish["luggage"].classList.add("alert-danger");
            errors += "Luggage capacity must be a positive number\n";
            writeError = true;
        }
        if (!validate_not_empty_string(formPublish["addres"].value)) {
            formPublish["addres"].classList.add("alert-danger");
            errors += "You must insert an address.\n";
            writeError = true;
        }
        if (!validate_city(formPublish["city"].value)) {
            formPublish["city"].classList.add("alert-danger");
            errors += "You must insert a city.\n";
            writeError = true;
        }
        if (!validate_vehicle_number_of_doors(formPublish["zip"].value)) {
            formPublish["zip"].classList.add("alert-danger");
            errors += "You must insert a zip.\n";
            writeError = true;
        }
        if (!validate_not_empty_string(formPublish["description"].value)) {
            formPublish["description"].classList.add("alert-danger");
            errors += "You must insert a description.\n";
            writeError = true;
        }
        if (!validate_dates(formPublish["date"][0].value, formPublish["date"][1].value)) {
            formPublish["date"][0].classList.add("alert-danger");
            formPublish["date"][1].classList.add("alert-danger");
            errors += "Insert valid dates.\n";
            writeError = true;
        }


        if (writeError) {
            alert(errors);
            dogodek.preventDefault();
        }
    });
}