	
var date1 = document.getElementById("date-from");
var date2 = document.getElementById("date-to");
date2.setAttribute("min", date1.value);

document.getElementById("date-from").addEventListener("change", function () {
    var date1 = document.getElementById("date-from");
    var date2 = document.getElementById("date-to");
    date2.setAttribute("min", date1.value);
    if(date2.value<date1.value) date2.value = date1.value;
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