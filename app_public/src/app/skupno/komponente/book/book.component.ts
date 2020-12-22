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
    this.getOwner();
    this.getVehicle();
    this.getRenter();

    this.dateFrom = "2021-01-01";
    this.dateTo = "2021-01-31";
    this.vehicle_picture = "../../../../assets/images/chevrolet-corvette.jpg";
    this.pickup_locations = "nesto nesto nesto 12";
    this.owner = this.bookService.owner;
    this.renter = this.bookService.renter;
    this.vehicle = this.bookService.vehicle;
    this.dateFrom = this.bookService.dateFrom.toISOString();
    this.dateTo = this.bookService.dateTo.toISOString();
  }


  private getOwner(): void {
    this.owner = new User();
    this.owner._id = "1";
    this.owner.firstname = "Pera";
    this.owner.lastname = "Peric";
    this.owner.username = "peca";
    this.owner.email = "peca@gmail.com";
    this.owner.phone_number = "123456";
    this.owner.location = "Srbija"
    this.owner.profile_picture = "../../../../assets/images/franka-potente-8052.jpg"
  }

  private getVehicle(): void {
    this.vehicle = new Vehicle();
    this.vehicle._id = "3";
    this.vehicle.price = 24;
  }

  private getRenter(): void {
    this.renter = new User();
    this.renter._id = "2";
    this.renter.firstname = "Greta";
    this.renter.lastname = "Garbo";
    this.renter.username = "geca";
    this.renter.email = "geca@gmail.com";
    this.renter.phone_number = "123456";
    this.renter.location = "Svedska";
    this.renter.profile_picture = "../../../../assets/images/avatarUser.png"
  }
}
