function submit_button_clicked() {
    
    var form = document.querySelector("date-form");
    form.addEventListener("submit", function(event){
        var date1 = document.getElementById("date-from").value;
        var date2 = document.getElementById("date-to").value;
        
        if (!validate_dates(date1, date2)) {
            alert("Dates are not valid");
            event.preventDefault();
        }
        
    });
    document.getElementById("submit_form_button").click();
}


// calculate and display price if valid
document.getElementById("date-form").addEventListener("change",function(){
    var date1 = new Date (document.getElementById("date-from").value);
    var date2 = new Date (document.getElementById("date-to").value);
    if (validate_dates(date1,date2)){
        var days = (date2-date1)/86400000;
        var dailyPrice = document.getElementById("daily-price").innerHTML;
        dailyPrice = dailyPrice.substring(0,dailyPrice.length-1);
        var price = days * dailyPrice + "€";
        document.getElementById("price").innerHTML = price;
    } else {
        document.getElementById("price").innerHTML = "";
    }
});

// favorite button
document.getElementById("favorite").addEventListener("click",function(){
    if (this.className =="far fa-heart"){
        this.className = "fas fa-heart";
        //TODO: add to favorite list
        //post action vehicles/favorites ali XMLHttpRequest + parametri, asinhrono!!
    } else {
        this.className = "far fa-heart";
        //TODO: remove from favorite list
    }
});
