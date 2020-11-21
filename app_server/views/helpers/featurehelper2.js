const hbs = require('hbs');
hbs.registerHelper('featurehelper2', (maxspeed, hp, typeoffuel,acceleration, seats, doors, consumption, minage, luggage) => {
    var rezultat ="";
    var sredina = "";
    if (typeoffuel!=undefined) sredina+="<div><i class='fas fa-charging-station'></i>"+ typeoffuel +"</div>";
    if (maxspeed!=undefined) sredina+="<div><i class='fas fa-tachometer-alt'></i>"+ maxspeed +" km/h</div>";
    if (acceleration!=undefined) sredina+="<div><i class='fas fa-shipping-fast'></i>"+ acceleration +" s (0-60 km/h)</div>";
    if (hp!=undefined) sredina+="<div><i class='fas fa-horse'></i>"+ hp +" kW</div>";
    if (consumption!=undefined) sredina+="<div><i class='fas fa-oil-can'></i>"+ consumption +" l</div>";
    if (seats!=undefined) sredina+="<div><i class='fas fa-couch'></i>"+ seats +" seats</div>";
    if (doors!=undefined) sredina+="<div><i class='fas fa-door-closed'></i>"+ doors +" doors</div>";
    if (luggage!=undefined) sredina+="<div><i class='fas fa-suitcase'></i>"+ luggage +" l</div>";
    if (minage!=undefined) sredina+="<div><i class='fas fa-user-graduate'></i>"+ minage +" (minimum age)</div>";
    rezultat="<div class='features col-sm-3'>"+ sredina + "</div>";
    //rezultat+="</div";
    return rezultat;
});