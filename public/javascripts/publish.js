
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