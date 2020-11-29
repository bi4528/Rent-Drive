	
var date1 = document.getElementById("date-from");
var date2 = document.getElementById("date-to");
date2.setAttribute("min", date1.value);

document.getElementById("date-from").addEventListener("change", function () {
    var date1 = document.getElementById("date-from");
    var date2 = document.getElementById("date-to");
    date2.setAttribute("min", date1.value);
    if(date2.value<date1.value) date2.value = date1.value;
});


let formPublish=document.getElementById("form");
formPublish["typeoffuel"].addEventListener("change", function(dogodek){
    if(formPublish["typeoffuel"].value=="Electric"){
        formPublish["consumption"].disabled=true;
    }
    else{
        formPublish["consumption"].disabled=false;
    }
});


function addLocation(){ //adds location, also checks if it exists
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
});

document.getElementById("input-location").addEventListener("change",function(){
    console.log(validate_word(this));
});

document.getElementById("save-changes").addEventListener("click", function(dogodek){
    writeError=false;
    errors="";
    var maxspeed = document.getElementById("maxspeed");
    var hp = document.getElementById("hp");
    var acceleration = document.getElementById("acceleration");
    var consumption = document.getElementById("consumption");
    var seats = document.getElementById("seats");
    var doors = document.getElementById("doors");
    var price = document.getElementById("price");
    var name = document.getElementById("name");
    if(!validate_vehicle_horespower(hp.value) ){
        hp.classList.add("alert-danger");
        errors+="Horespower should be only numbers.\n";
        writeError=true;
    }    
    if(!validate_vehicle_speed(maxspeed.value)){
        maxspeed.classList.add("alert-danger");
        errors+="Maxspeed should be only numbers.\n";
        writeError=true;
    }
    if(!validate_acceleration(acceleration.value) ){
        acceleration.classList.add("alert-danger");
        errors+="Acceleration should be written in the next format => number.number or just a number(s).\n";
        writeError=true;
    }
    if(!validate_not_empty_string(consumption.value) && consumption.disabled==false){
        consumption.classList.add("alert-danger");
        errors+="Consumption field must not be empty, except if the vehicle is electric\n";
        writeError=true;
    }
    if(!validate_vehicle_doors_seats(seats.value)){
        seats.classList.add("alert-danger");
        errors+="Number of seats is only one number.\n";
        writeError=true;
    }
    if(!validate_vehicle_doors_seats(doors.value)){
        doors.classList.add("alert-danger");
        errors+="Number of doors is only one number.\n";
        writeError=true;
    }
    if(!validate_vehicle_price_per_day(price.value)){
        price.classList.add("alert-danger");
        errors+="Price must be between 1 and 5000.\n";
        writeError=true;
    }
    if(!validate_not_empty_string(name.value)){
        price.classList.add("alert-danger");
        errors+="Name must not be empty!\n";
        writeError=true;
    }
    if(writeError){
        alert(errors);
        dogodek.preventDefault();
    }
});