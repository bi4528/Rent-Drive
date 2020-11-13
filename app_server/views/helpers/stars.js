const hbs = require('hbs');
hbs.registerHelper('stars', (number) => {
    let rez="";
    for(var i=1; i<=5;i++){
        if(i<=number) rez+="<i class='fas fa-star'></i>";
        else rez+="<i class='far fa-star'></i>";
    }
    return rez;
});