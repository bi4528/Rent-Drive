const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const password_regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


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
    return name != null && name.length() > 0;
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
    return speed > 0;
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