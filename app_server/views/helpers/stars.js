const hbs = require('hbs');
hbs.registerHelper('stars', (number) => {
    let rez="";
    var stop = false;
    var j = 1;
    while (j<=number){
        rez+="<i class='fas fa-star'></i>";
        j++;
    }
    if (j-1!=number) {
        rez+="<i class='fas fa-star-half-alt'></i>";
        for(var i=j+1;i<=5;i++) 
            rez+="<i class='far fa-star'></i>";
    } else {
        for(var i=j;i<=5;i++) 
            rez+="<i class='far fa-star'></i>";
    }
    if(number!=null){
        rez+="("+number.toFixed(2)+")"
    }
    return rez;
});