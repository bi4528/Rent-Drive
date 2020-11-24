const hbs = require('hbs');
hbs.registerHelper('featurehelper', (AirConditioning, bluetooth, Navigation, usb, aux, parkingsensors, autopilot, accessibility) => {
    var rezultat ="";

    rezultat+="<div class='features col-sm-3'>";
    var textType = "success";

    if(AirConditioning) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-snowflake'></i><span class='text-" + textType + "'>" +"AC"  +"</span></div>";
    if(bluetooth) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-bluetooth'></i><span class='text-" + textType + "'>" +"bluetooth"  +"</span></div>";
    if(Navigation) textType = "success"; else textType="danger";
    rezultat+="<div><i class='far fa-map'></i><span class='text-" + textType + "'>" +"GPS"  +"</span></div>";
    if(usb) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-usb'></i><span class='text-" + textType + "'>" +"USB"  +"</span></div>";
    if(accessibility) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-accessible-icon'></i><span class='text-" + textType + "'>" +"accessible"  +"</span></div>";
    if(autopilot) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-plane'></i><span class='text-" + textType + "'>" +"autopilot"  +"</span></div>";
    if(aux) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-music'></i><span class='text-" + textType + "'>" +"AUX"  +"</span></div>";
    if(parkingsensors) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-parking'></i><span class='text-" + textType + "'>" +"parking sensors"  +"</span></div>";
    rezultat+="</div";

    return rezultat;
});