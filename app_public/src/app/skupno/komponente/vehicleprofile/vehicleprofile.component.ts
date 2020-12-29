import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Review, Vehicle } from '../../razredi/vehicle';
import { User } from '../../razredi/user';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ModalComponent } from '../modal/modal.component';
import { BookServiceService } from '../../storitve/book-service.service';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-vehicleprofile',
  templateUrl: './vehicleprofile.component.html',
  styleUrls: ['./vehicleprofile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  constructor(
    private bookService: BookServiceService, 
    private router: Router, 
    private pot: ActivatedRoute,
    private vehicleDataService: VehiclesDataService,
    private usersDataService: UsersDataService,
    private avtentikacijaStoritev: AuthenticationService,
    private elementRef: ElementRef,
    private povezavaStoritev: PovezavaService
    ) { }

  public avg_rating: Number;
  public owner_id: String;
  public vehicleId: string; //on purpose!
  public alert_error: String;
  public vehicle: Vehicle;
  public user: User;
  public car_photos: any;
  public indicators: any;
  public user_logged: boolean;
  public actualLoggedUser: User;
  public is_favourite_of_logged_user: boolean;
  public showReviewForm = false;

  ngOnInit(): void {
    this.vehicleId = this.pot.snapshot.paramMap.get('idVehicle');
    this.get_vehicle_data(this.vehicleId);
    this.user_logged = this.avtentikacijaStoritev.is_logged();
    var actualLoggedUserId = this.avtentikacijaStoritev.get_current_user()._id;
    this.usersDataService
      .getUser(actualLoggedUserId)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.actualLoggedUser = data;
        console.log("LOGGED ", this.actualLoggedUser);
        if(this.actualLoggedUser.favourite_vehicles_ids.includes(this.vehicle._id)) this.is_favourite_of_logged_user=true;
      });
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
  
  public get_vehicle_data = (vehicleId: String): void => {
  this.alert_error = "Searching for vehicle";
  this.vehicleDataService
    .getVehicle(vehicleId)
    .then((data: Vehicle) => {
      this.alert_error = (data != null) ? "" : "No vehicle found";
      this.vehicle = data;
      console.log("VEHICLE ",this.vehicle);
      this.get_user_data(this.vehicle.owner_id);
      this.setCarPhotosAndIndicators(this.vehicle.images);
      this.setAvgRating();
    }).catch(()=>this.router.navigateByUrl("/error"));
  }
  
  public get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.user = data;
        console.log("OWNER ", this.user);
      });
  }

  public setCarPhotosAndIndicators(images: string[]): void {
    for (var i = 0; i < images.length; i++) {
      if (i == 0) {
        this.car_photos = [];
        this.indicators = [];
        this.car_photos.push({ "image": images[i], "active": "active" });
        this.indicators.push({ "num": i.toString(), "active": "active" });
      }
      else {
        this.car_photos.push({ "image": images[i] });
        this.indicators.push({ "num": i.toString() });
      }
    }
  }

  public setAvgRating(): void {
    var sum = 0;
    for (var i = 0; i < this.vehicle.reviews.length; i++)
      sum += this.vehicle.reviews[i].rating.match(/★/g).length;
    if (sum > 0) {
      if (this.vehicle != null) {
        var newAvgRating = sum / this.vehicle.reviews.length;
        this.avg_rating = newAvgRating;
      }
    }
  }

  public book(): void {
    var date1 = new Date((<HTMLInputElement>document.getElementById("date-from")).value);
    var date2 = new Date((<HTMLInputElement>document.getElementById("date-to")).value);
    var today = new Date();
    if (!this.validate_dates(date1, date2)) {
      this.alert_error ="Please enter valid dates!"
      this.openModal();
    } else if (this.avtentikacijaStoritev.get_current_user()==null){
      this.alert_error = "Please log in before booking!";
      this.openModal();
    } else if (this.vehicle.owner_id == this.actualLoggedUser._id){
      this.alert_error = "Can't book own vehicle.\n";
      this.openModal();
    } else if (date1 < today || date2 < today){
      this.alert_error = "Unfortunately, the rent period has expired.\n" + "From: " + new Date(this.vehicle.date[0]).toLocaleDateString("en-GB") +"\n" + "To: " + new Date(this.vehicle.date[1]).toLocaleDateString("en-GB") + "\n" + "Please contact the owner if you wish to rent this vehicle.";
      this.openModal();
    } 
    else {
      this.router.navigateByUrl("/book/" + this.vehicleId);
      this.usersDataService
      .getUser(this.avtentikacijaStoritev.get_current_user()._id)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.actualLoggedUser = data;
      });
      this.bookService.book(this.user, this.actualLoggedUser, this.vehicle, date1, date2 );
    }
  }


  public favorite() {
    var heart = (<HTMLInputElement>document.getElementById("favorite"));
    if (!this.avtentikacijaStoritev.is_logged()){
      this.alert_error = "To favorite a vehicle you must be logged!"
      this.openModal();
    } else if (heart.className == "far fa-heart") {
      heart.className = "fas fa-heart";
      //console.log(this.actualLoggedUser);
      this.actualLoggedUser.favourite_vehicles_ids.push(this.vehicleId);
      this.usersDataService.update_favourite_vehicles(this.actualLoggedUser).then((success)=> {
        success ? "" : "Failed to favorite vehicle!";
        this.ngOnInit();
      })
    } else {
      heart.className = "far fa-heart";
      if (this.actualLoggedUser.favourite_vehicles_ids.includes(this.vehicleId)) {
        this.usersDataService.update_favourite_vehicles(this.actualLoggedUser).then((success)=> {
          success ? "" : "Failed to unfavorite vehicle!";
          this.ngOnInit();
        })
      }
    }
  }

  public deleteReview(reviewId) {
    this.vehicleDataService.deleteReview(this.vehicle, reviewId).then(() => {
      this.router.navigateByUrl("/vehicles/" + this.vehicle._id);
      this.ngOnInit();
    });
  }

  closeAndUpdateReview(){
    this.showReviewForm = false;
    this.ngOnInit();
  }

  public test(): void {
    var date1String = (<HTMLInputElement>document.getElementById("date-from")).value;
    var date2String = (<HTMLInputElement>document.getElementById("date-to")).value;
    var date1 = new Date(date1String);
    var date2 = new Date(date2String);
    if (date1String != "") {
      if (date1 > date2) (<HTMLInputElement>document.getElementById("date-to")).value = date1String;
      document.getElementById("date-to").setAttribute("min", date1String);
      date1 = new Date((<HTMLInputElement>document.getElementById("date-from")).value);
      date2 = new Date((<HTMLInputElement>document.getElementById("date-to")).value);
    }
    if (this.validate_dates(date1, date2)) {
      var days = 1 + (date2.getTime() - date1.getTime()) / 86400000;
      var dailyPrice = (<HTMLInputElement>document.getElementById("daily-price")).innerHTML;
      dailyPrice = dailyPrice.substring(0, dailyPrice.length - 1);
      var dailyPriceNum = +dailyPrice;
      var price = days * dailyPriceNum + "€";
      (<HTMLInputElement>document.getElementById("price")).innerHTML = price;
      (<HTMLInputElement>document.getElementById("submit-button")).disabled = false;;
    } else {
      document.getElementById("price").innerHTML = "";
      (<HTMLInputElement>document.getElementById("submit-button")).disabled = true;
    }
  }

  public validate_dates(date1: Date, date2: Date) {
    date1 = new Date(date1);
    date2 = new Date(date2);
    return date2 >= date1;
  }

}
