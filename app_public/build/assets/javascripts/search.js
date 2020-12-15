window.addEventListener('load', (event) => {

    document.body.getElementsByClassName("searchbutton")[0].addEventListener('click', ()=>{
        let niz=document.body.getElementsByClassName("q")[0].value;
        document.body.getElementsByClassName("searchlink")[0].href="/search?value="+niz;
    });

});