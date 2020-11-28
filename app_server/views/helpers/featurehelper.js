const hbs = require('hbs');
hbs.registerHelper('featurehelper', (AirConditioning, bluetooth, Navigation, usb, aux, parkingsensors, autopilot, accessibility) => {
    var rezultat ="";

    rezultat+="<div class='features col-sm-3'>";
    var textType = "success";

    if(AirConditioning=="on" || AirConditioning=="1" ) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-snowflake'></i><span class='text-" + textType + "'>" +"AC"  +"</span></div>";
    if(bluetooth=="on" || bluetooth=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-bluetooth'></i><span class='text-" + textType + "'>" +"bluetooth"  +"</span></div>";
    if(Navigation=="on"  || Navigation=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='far fa-map'></i><span class='text-" + textType + "'>" +"GPS"  +"</span></div>";
    if(usb=="on" || usb=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-usb'></i><span class='text-" + textType + "'>" +"USB"  +"</span></div>";
    if(accessibility=="on" || accessibility=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-accessible-icon'></i><span class='text-" + textType + "'>" +"accessible"  +"</span></div>";
    if(autopilot=="on" || autopilot=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-plane'></i><span class='text-" + textType + "'>" +"autopilot"  +"</span></div>";
    if(aux=="on" || aux=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-music'></i><span class='text-" + textType + "'>" +"AUX"  +"</span></div>";
    if(parkingsensors=="on" || parkingsensors=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-parking'></i><span class='text-" + textType + "'>" +"parking sensors"  +"</span></div>";
    rezultat+="</div";

    return rezultat;
});