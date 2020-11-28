//const validate  = require("./validate.js");

function validate_dates(date1, date2) {
    var date1 = new Date(date1);
    var date2 = new Date(date2);
    return date2>=date1;
}

window.addEventListener('load', (event) => {
    document.body.getElementsByClassName("filterbutton")[0].addEventListener('click', (event)=>{
        let filterCity=document.body.getElementsByClassName("filterCity")[0].value;
        let dateFrom=document.body.getElementsByClassName("dateFrom")[0].value;
        let dateTo=document.body.getElementsByClassName("dateTo")[0].value;
        console.log(filterCity+" "+dateFrom+" "+dateTo);
        

        if(filterCity==="" || dateFrom==="" || dateTo==="" ){
            alert("Fill in all the criterias in order to filter");
            event.preventDefault();
        }
        else if(!validate_dates(dateFrom, dateTo)){
            alert("Date from must be before date to, or can you travel trough time?");
            event.preventDefault();
        }
        
        //document.body.getElementsByClassName("filterlink")[0].href="/search";
        document.body.getElementsByClassName("filterlink")[0].href="/search?city="+filterCity+"&dateFrom="+dateFrom+"&dateTo="+dateTo;
    });
});