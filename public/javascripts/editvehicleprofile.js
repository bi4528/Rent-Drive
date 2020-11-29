
var date1 = document.getElementById("date-from");
var date2 = document.getElementById("date-to");
date2.setAttribute("min", date1.value);

document.getElementById("date-from").addEventListener("change", function () {
    var date1 = document.getElementById("date-from");
    var date2 = document.getElementById("date-to");
    date2.setAttribute("min", date1.value);
    if (date2.value < date1.value) date2.value = date1.value;
});


let formPublish = document.getElementById("form");
formPublish["typeoffuel"].addEventListener("change", function (dogodek) {
    if (formPublish["typeoffuel"].value == "Electric") {
        formPublish["consumption"].disabled = true;
    }
    else {
        formPublish["consumption"].disabled = false;
    }
});


/*function addLocation(){ //adds location, also checks if it exists
    var locations = document.getElementById("locations");
    var inputLocation = document.getElementById("input-location").value;
    for (var i=1;i<locations.childElementCount;i++){ // first child is label
        console.log(locations.children[i].lastElementChild.innerHTML);
        if(locations.children[i].lastElementChild.innerHTML==inputLocation) return;
    }
    var newNum = locations.childElementCount-1; //first child is label
    var newLocation = "location-" + newNum.toString(); 
    var child = document.createElement('div');
    child.setAttribute("class","custom-control custom-checkbox mx-2");

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("class","custom-control-input");
    checkbox.setAttribute("id",newLocation);
    checkbox.setAttribute("checked","true");
    checkbox.setAttribute("onchange","removeLocation("+newNum+")")

    var label = document.createElement("label");
    label.setAttribute("class","custom-control-label");
    label.setAttribute("for",newLocation);
    label.innerHTML = inputLocation;

    child.appendChild(checkbox);
    child.appendChild(label);
    locations.appendChild(child);
}

var lastDeleted = -1;
var divDeleted = null;

function removeLocation(index){
    var locations = document.getElementById("locations");
    var div = document.getElementById("location-"+index).parentNode;
    lastDeleted=index;
    divDeleted = locations.children[index+1];
    div.parentNode.removeChild(div);
}

document.getElementById("undo").addEventListener("click", function(){
    if (lastDeleted==-1) return;
    else {
        var index = lastDeleted;
    var locations = document.getElementById("locations");
    divDeleted.firstElementChild.checked="true";
    locations.insertBefore(divDeleted,locations.children[index+1]);
    lastDeleted=-1;
    divDeleted=null;
    }
});*/


document.getElementById("save-changes").addEventListener("click", function (dogodek) {
    writeError = false;
    errors = "";
    var maxspeed = document.getElementById("maxspeed");
    var hp = document.getElementById("hp");
    var acceleration = document.getElementById("acceleration");
    var consumption = document.getElementById("consumption");
    var seats = document.getElementById("seats");
    var doors = document.getElementById("doors");
    var price = document.getElementById("price");
    var make = document.getElementById("make");
    var model = document.getElementById("model");
    var luggage = document.getElementById("luggage");
    var addres = document.getElementById("addres");
    var zip = document.getElementById("zip");
    var description = document.getElementById("description");
    if (!validate_vehicle_make(make.value)) {
        make.classList.add("alert-danger");
        errors += "Make should have only letters.\n";
        writeError = true;
    }
    if (!validate_not_empty_string(model.value)) {
        model.classList.add("alert-danger");
        errors += "Model text field should not be empty.\n";
        writeError = true;
    }
    if (!validate_vehicle_horespower(hp.value)) {
        hp.classList.add("alert-danger");
        errors += "Horespower should be only numbers.\n";
        writeError = true;
    }
    if (!validate_vehicle_speed(maxspeed.value)) {
        maxspeed.classList.add("alert-danger");
        errors += "Maxspeed should be only numbers.\n";
        writeError = true;
    }
    if (!validate_acceleration(acceleration.value)) {
        acceleration.classList.add("alert-danger");
        errors += "Acceleration should be written in the next format => number.number or just a number(s).\n";
        writeError = true;
    }
    if (!validate_not_empty_string(consumption.value) && consumption.disabled == false) {
        consumption.classList.add("alert-danger");
        errors += "Consumption field must not be empty, except if the vehicle is electric\n";
        writeError = true;
    }
    if (!validate_vehicle_doors_seats(seats.value)) {
        seats.classList.add("alert-danger");
        errors += "Number of seats is only one number.\n";
        writeError = true;
    }
    if (!validate_vehicle_doors_seats(doors.value)) {
        doors.classList.add("alert-danger");
        errors += "Number of doors is only one number.\n";
        writeError = true;
    }
    if (!validate_vehicle_price_per_day(price.value)) {
        price.classList.add("alert-danger");
        errors += "Price must be between 1 and 5000.\n";
        writeError = true;
    }
    if (!validate_vehicle_luggage(luggage.value)) {
        luggage.classList.add("alert-danger");
        errors += "Luggage capacity must be a positive number\n";
        writeError = true;
    }
    if (!validate_not_empty_string(addres.value)) {
        addres.classList.add("alert-danger");
        errors += "You must insert an address.\n";
        writeError = true;
    }
    if (!validate_vehicle_number_of_doors(zip.value)) {
        zip.classList.add("alert-danger");
        errors += "You must insert a zip.\n";
        writeError = true;
    }
    if (!validate_not_empty_string(description.value)) {
        description.classList.add("alert-danger");
        errors += "You must insert a description.\n";
        writeError = true;
    }
    debugger;
    if (!validate_dates(date1.value, date2.value)) {
        date1.classList.add("alert-danger");
        date2.classList.add("alert-danger");
        errors += "Insert valid dates.\n";
        writeError = true;
    }
    if (writeError) {
        alert(errors);
        dogodek.preventDefault();
    }
});

function validate_phone_number(number) {
    return validate_not_empty_string(number) && phone_regex.test(number);
}

function validate_not_empty_string(name) {
    return name != null && name.length > 0;
}

function validate_location(location) {
    return validate_not_empty_string(location);
}

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