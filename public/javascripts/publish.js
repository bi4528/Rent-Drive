
let formPublish=document.getElementById("list-your-car");
formPublish["typeoffuel"].addEventListener("change", function(dogodek){
    if(formPublish["typeoffuel"].value=="Electric"){
        formPublish["consumption"].disabled=true;
    }
    else{
        formPublish["consumption"].disabled=false;
    }
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
/*
function appendToForm (){
    var form = document.getElementById("list-your-car").children[1];
    var zip = document.getElementById("zip");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    
    var location = address.value +", " + zip.value +" " + city.value+ ", Slovenia";
    addHiddenInputWithParent(form,address.value,zip.value,city.value);
}

function addHiddenInputWithParent(form, address, zip, city){
    var parent = document.createElement('div');
    parent.setAttribute("type", "hidden");
    parent.setAttribute("name", "pickup_locations");
    parent.classList.add("input-group");
    var child1 = document.createElement('input');
    child1.setAttribute("type", "hidden");
    child1.setAttribute("name","address");
    child1.setAttribute("value",address);
    child1.classList.add("form-control");
    parent.appendChild(child1);
    var child2 = document.createElement('input');
    child2.setAttribute("type", "hidden");
    child2.setAttribute("name","zip");
    child2.setAttribute("value",zip);
    child2.classList.add("form-control");
    parent.appendChild(child2);
    var child3 = document.createElement('input');
    child3.setAttribute("type", "hidden");
    child3.setAttribute("name","city");
    child3.setAttribute("value",city);
    child3.classList.add("form-control");
    parent.appendChild(child3);
    form.appendChild(parent);
    //debugger;
}
*/