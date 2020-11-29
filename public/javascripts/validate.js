const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const make_regex= /\b[a-z]+\b/i;
const word_regex = /\b[a-z || A-Z]+\b/;
const phone_regex = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
const no_spaces = /^\S*$/;

function validate_first_name(name) {
    return validate_not_empty_string(name) && validate_word(name);
}

function validate_username(name) {
    return validate_not_empty_string(name);
}

function validate_phone_number(number) {
    return validate_not_empty_string(number) && phone_regex.test(number);
}


function validate_last_name(name) {
    return validate_not_empty_string(name) && validate_word(name);
}


function validate_word(name) {
    return name!= null && word_regex.test(name);
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

function validate_no_spaces(word){
    return no_spaces.test(word);
}
