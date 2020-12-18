import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../razredi/vehicle';

@Pipe({
  name: 'featurehelper'
})
export class FeaturehelperPipe implements PipeTransform {

  transform(vehicle:Vehicle): string {
    var rezultat ="";
    rezultat+="<div class='features col-sm-3'>";
    var textType = "success";
    if(vehicle.AirConditioning=="on" || vehicle.AirConditioning=="1" ) textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-snowflake'></i><span class='text-" + textType + "'>" +"AC"  +"</span></div>";
    if(vehicle.bluetooth=="on" || vehicle.bluetooth=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-bluetooth'></i><span class='text-" + textType + "'>" +"bluetooth"  +"</span></div>";
    if(vehicle.Navigation=="on"  || vehicle.Navigation=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='far fa-map'></i><span class='text-" + textType + "'>" +"GPS"  +"</span></div>";
    if(vehicle.USB=="on" || vehicle.USB=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-usb'></i><span class='text-" + textType + "'>" +"USB"  +"</span></div>";
    if(vehicle.accessibility=="on" || vehicle.accessibility=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fab fa-accessible-icon'></i><span class='text-" + textType + "'>" +"accessible"  +"</span></div>";
    if(vehicle.autopilot=="on" || vehicle.autopilot=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-plane'></i><span class='text-" + textType + "'>" +"autopilot"  +"</span></div>";
    if(vehicle.AUX=="on" || vehicle.AUX=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-music'></i><span class='text-" + textType + "'>" +"AUX"  +"</span></div>";
    if(vehicle.parkingsensors=="on" || vehicle.parkingsensors=="1") textType = "success"; else textType="danger";
    rezultat+="<div><i class='fas fa-parking'></i><span class='text-" + textType + "'>" +"parking sensors"  +"</span></div>";
    rezultat+="</div>";

    rezultat+="<br>"

    rezultat+="<div class='features col-sm-3'>";
    if (vehicle.typeoffuel!=undefined) rezultat+="<div><i class='fas fa-charging-station'></i>"+ vehicle.typeoffuel +"</div>";
    if (vehicle.maxspeed!=undefined) rezultat+="<div><i class='fas fa-tachometer-alt'></i>"+ vehicle.maxspeed +" km/h</div>";
    if (vehicle.acceleration!=undefined) rezultat+="<div><i class='fas fa-shipping-fast'></i>"+ vehicle.acceleration +" s (0-60 km/h)</div>";
    if (vehicle.hp!=undefined) rezultat+="<div><i class='fas fa-horse'></i>"+ vehicle.hp +" kW</div>";
    if (vehicle.consumption!=undefined) rezultat+="<div><i class='fas fa-oil-can'></i>"+ vehicle.consumption +" l</div>";
    if (vehicle.seats!=undefined) rezultat+="<div><i class='fas fa-couch'></i>"+ vehicle.seats +" seats</div>";
    if (vehicle.doors!=undefined) rezultat+="<div><i class='fas fa-door-closed'></i>"+ vehicle.doors +" doors</div>";
    if (vehicle.luggage!=undefined) rezultat+="<div><i class='fas fa-suitcase'></i>"+ vehicle.luggage +" l</div>";
    if (vehicle.minage!=undefined) rezultat+="<div><i class='fas fa-user-graduate'></i>"+ vehicle.minage +" (minimum age)</div>";
    rezultat+="</div>";
    debugger;
    return rezultat;
  }

}
