const hbs = require('hbs');

hbs.registerHelper('loadcarousel', (vsebina) => {
    let rezultat="<div class=\"carousel-item active\"><br>";
    counter=0;
    for (i=0; i<vsebina.length; i++){
        if(counter==4){
            counter=0;
            rezultat+="</div>";
            rezultat+="<div class=\"carousel-item\">";
        }
        rezultat+="<div class=\"visina col-md-6 col-lg-3 float-left\"><br> <div class=\"card mb-2\"><br> <img class=\"card-img-top car_image_home\" src=\""+vsebina[i].image+"\" alt=\"Car image\"><br> <div class=\"card-body\"><br> <h4 class=\"card-title\">"+vsebina[i].make+" "+vsebina[i].model+"<\/h4><br> <p class=\"card-text\">"+vsebina[i].description+"<br> <\/p><br> <a class=\"btn btn-light rounded border-secondary stretched-link\">Book for only"+vsebina[i].price+"\u20AC\/day<\/a><br> <\/div><br> <\/div><br> <\/div>";
        counter++;
    }
    rezultat+="</div>";
    
    return rezultat;
});