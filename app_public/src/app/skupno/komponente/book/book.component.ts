import { Component, OnInit } from '@angular/core';
import {User} from "../../razredi/user";
import {Vehicle} from "../../razredi/vehicle";
import {ActivatedRoute, Router} from "@angular/router";
import { BookServiceService } from '../../storitve/book-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private router: Router, private pot: ActivatedRoute, private bookService: BookServiceService){}

  public owner: User;
  public vehicle: Vehicle;
  public renter: User;
  public dateFrom: string;
  public dateTo: string;
  public vehicle_picture: string;
  public pickup_locations: string;


  ngOnInit(): void {

    this.pickup_locations = "nesto nesto nesto 12";
    this.owner = this.bookService.owner;
    this.renter = this.bookService.renter;
    this.vehicle = this.bookService.vehicle;
    this.dateFrom = this.bookService.dateFrom.toDateString();
    this.dateTo = this.bookService.dateTo.toDateString();
    console.log(this.renter);
  }

}
