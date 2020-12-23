import { Component, OnInit } from '@angular/core';
import {User} from "../../razredi/user";
import {Vehicle} from "../../razredi/vehicle";
import {Rent} from "../../razredi/rent";
import {ActivatedRoute, Router} from "@angular/router";
import { BookServiceService } from '../../storitve/book-service.service';
import {RentedDataService} from "../../storitve/rented-data.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  private alert_error: string;

  constructor(private router: Router, private pot: ActivatedRoute, private bookService: BookServiceService,
              private rentedService: RentedDataService){}

  public owner: User;
  public vehicle: Vehicle;
  public renter: User;
  public dateFrom: Date;
  public dateTo: Date;
  public vehicle_picture: string;
  public pickup_locations: string;
  public data: Rent;


  ngOnInit(): void {

    this.owner = this.bookService.owner;
    this.renter = this.bookService.renter;
    this.vehicle = this.bookService.vehicle;
    this.dateFrom = this.bookService.dateFrom;
    this.dateTo = this.bookService.dateTo;
    console.log(this.renter);
  }

  public bookRent(): void {
    let data: Rent = {
      user_id: this.renter._id,
      vehicle_id: this.vehicle._id,
      date_from: this.dateFrom,
      date_to: this.dateTo
    }

    this.rentedService
      .createRented(data)
      .then((rent) => {
        this.alert_error = (rent != null) ? "" : "Failed to create rent";
        this.router.navigateByUrl("book/"+this.vehicle._id+"/confirm");
      })

  }

}
