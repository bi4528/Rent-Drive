import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pickupLocation'
})
export class PickupLocationPipe implements PipeTransform {

  transform(adres: string, city: string, country: string): string {

    let rezultat = adres + ' ' + city + ' ' + country;

    return rezultat;
  }

}
