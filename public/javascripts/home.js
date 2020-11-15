window.addEventListener('load', (event) => {
    document.body.getElementsByClassName("filterbutton")[0].addEventListener('click', (event)=>{
        let filterCity=document.body.getElementsByClassName("filterCity")[0].value;
        let dateFrom=document.body.getElementsByClassName("dateFrom")[0].value;
        let dateTo=document.body.getElementsByClassName("dateTo")[0].value;
        console.log(filterCity+" "+dateFrom+" "+dateTo);
        
        //document.body.getElementsByClassName("filterlink")[0].href="/search";
        document.body.getElementsByClassName("filterlink")[0].href="/search?city="+filterCity+"&dateFrom="+dateFrom+"&dateTo="+dateTo;
    });
});