import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../razredi/user";
import {Vehicle} from "../../razredi/vehicle";
import {Rent} from "../../razredi/rent";
import {ActivatedRoute, Router} from "@angular/router";
import {BookServiceService } from '../../storitve/book-service.service';
import {RentedDataService} from "../../storitve/rented-data.service";
import {ConfirmServiceService} from "../../storitve/confirm-service.service";
import { ModalComponent } from '../modal/modal.component';
import { stringify } from '@angular/compiler/src/util';
import {AuthenticationService} from "../../storitve/avtentikacija.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public alert_error: string;
  public alert_header:string;

  constructor(private router: Router, private pot: ActivatedRoute, private bookService: BookServiceService,
              private rentedService: RentedDataService, private confirmService: ConfirmServiceService,
              private authenticationService: AuthenticationService){}

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
    //console.log(this.renter);
  }

  public bookRent(): void {
    let data: Rent = {
      _id: '',
      user_id: this.authenticationService.get_current_user()._id,
      vehicle_id: this.vehicle._id,
      date_from: this.dateFrom,
      date_to: this.dateTo
    }

    this.rentedService
      .createRented(data)
      .then((rent) => {
        //this.alert_error = (rent != null) ?
        this.router.navigateByUrl("book/"+this.vehicle._id+"/confirm");
        this.confirmService.confirmMessage("Your reservation has been processed successfully!")
      })
      .catch((resp: any) => {
        this.alert_error = resp;
        this.alert_header = "Error!";
        this.openModal();
      })

  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }


}
