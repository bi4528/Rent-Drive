window.addEventListener('load', (event) => {

    document.body.getElementsByClassName("searchbutton")[0].addEventListener('click', ()=>{
        let niz=document.body.getElementsByClassName("q")[0].value;

        let searchcards=document.body.getElementsByClassName("searchcard");
        let model=document.body.getElementsByClassName("model");
        let description=document.body.getElementsByClassName("description");
        let seznam=document.body.getElementsByClassName("row")[0];
        for(i=0; i<searchcards.length; i++){
            if(model[i].innerHTML.includes(niz) || description[i].innerHTML.includes(niz) ){
                console.log("ostane");
            }
            else{
                searchcards[i].parentNode.removeChild(searchcards[i]);
            }
        }

    });
    console.log("OLA");
});