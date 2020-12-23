import { Pipe, PipeTransform } from '@angular/core';
import {Vehicle} from '../razredi/vehicle';

@Pipe({
  name: 'carouselVehicles'
})
export class CarouselVehiclesPipe implements PipeTransform {

  transform(vsebina: Vehicle[]): string {
    let rezultat="<div class=\"carousel-item active\"><br>";
    let counter=0;
    for (let i=0; i<vsebina.length; i++){
        if(counter==4){
            counter=0;
            rezultat+="</div>";
            rezultat+="<div class=\"carousel-item\">";
        }
        rezultat+="<div class=\"visina col-md-6 col-lg-3 float-left\"><br> <div class=\"card mb-2\"><br> <img class=\"card-img-top car_image_home\" sizes=\"25%\" src=\"../../../assets/uploads/"+vsebina[i].images[0]+"\" alt=\"Car image\"><br> <div class=\"card-body\"><br> <h4 class=\"card-title\">"+vsebina[i].make+" "+vsebina[i].model+"<\/h4><br> <p class=\"card-text\">"+vsebina[i].description+"<br> <\/p><br> <a href=\"/vehicles/"+vsebina[i]._id+"\" class=\"btn btn-light rounded border-secondary stretched-link\">Book for only "+vsebina[i].price+"\u20AC\/day<\/a><br> <\/div><br> <\/div><br> <\/div>";
        counter++;
    }
    rezultat+="</div>";
    
    return rezultat;
  }

}
