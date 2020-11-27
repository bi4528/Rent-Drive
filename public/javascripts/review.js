let formPublish=document.getElementById("reviewform");


function validate_not_empty_string (name) {
    return name != null && name.length > 0;
}

formPublish.addEventListener("submit", function(dogodek){
    writeError=false;
    errors="";
    
    //console.log(formPublish["comment"].value);
    //console.log(document.getElementById("myRadio").value);
   
    if(!validate_not_empty_string(formPublish["comment"].value)){
        formPublish["comment"].classList.add("alert-danger");
        errors+="Comment must not be empty.\n";
        writeError=true;
    }
    else if (document.getElementById("myRadio").value === "" ){
        formPublish["stars"].classList.add("alert-danger");
        errors+="Please select rating.\n";
        writeError=true;
    }
    
    if(writeError){
        alert(errors);
        dogodek.preventDefault();
    }
});