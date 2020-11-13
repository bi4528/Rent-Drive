window.addEventListener('load', (event) => {
    let searchcards=document.body.getElementsByClassName("searchcard");
    let model=document.body.getElementsByClassName("model");
    let description=document.body.getElementsByClassName("description");
    let container=document.body.getElementsByClassName("containercards")[0];
    
    document.body.getElementsByClassName("searchbutton")[0].addEventListener('click', ()=>{
        let cardslocal=document.body.getElementsByClassName("searchcard");
        let niz=document.body.getElementsByClassName("q")[0].value;
        
        karte=searchcards.length
        for(i=0; i<karte; i++){
            cardslocal[i].parentNode.removeChild(cardslocal[i]);
        }
        console.log(searchcards);
        for(i=0; i<karte; i++){
            if(model[i].innerHTML.toLowerCase().includes(niz.toLowerCase()) || description[i].innerHTML.toLowerCase().includes(niz.toLowerCase()) ){
                container.appendChild(searchcards[i]);
                //i--;
            }
            else{
                //container.removeChild(searchcards[i]);
                //i--;
            }
        }

    });

});