import { Injectable } from '@angular/core';
import { User } from '../razredi/user';
import { Vehicle } from '../razredi/vehicle';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  constructor() { }
  
  owner: User;
  renter: User;
  vehicle: Vehicle;
  dateFrom: Date;
  dateTo: Date;
  
  book (owner:User, renter:User, vehicle:Vehicle, dateFrom:Date, dateTo:Date) {
    this.owner = owner;
    this.renter = renter;
    this.vehicle = vehicle;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
