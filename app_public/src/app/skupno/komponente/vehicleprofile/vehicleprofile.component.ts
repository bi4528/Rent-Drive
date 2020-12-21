import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Vehicle } from '../../razredi/vehicle';
import { User } from '../../razredi/user';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ModalComponent } from '../modal/modal.component';
import { BookServiceService } from '../../storitve/book-service.service';

@Component({
  selector: 'app-vehicleprofile',
  templateUrl: './vehicleprofile.component.html',
  styleUrls: ['./vehicleprofile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  constructor(
    private bookService: BookServiceService,private router: Router, private pot: ActivatedRoute, private vehicleDataService: VehiclesDataService, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService, private elementRef: ElementRef) { }

  public get_vehicle_data = (vehicleId: String): void => {
    this.alert_error = "Searching for vehicle";
    this.vehicleDataService
      .getVehicle(vehicleId)
      .then((data: Vehicle) => {
        this.alert_error = (data != null) ? "" : "No vehicle found";
        this.vehicle = data;
        console.log(this.vehicle);
        this.get_user_data(this.vehicle.owner_id);
        this.setCarPhotosAndIndicators(this.vehicle.images);
        this.setAvgRating();
      });
  }
  
  public get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data != null) ? "" : "No user found";
        this.user = data;
        console.log(this.user);
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
    /*for(var i = 0; i < this.vehicle.reviews.length; i++) {
      this.vehicle.reviews[i].show_delete_button = req.session.user_id != null ? odgovor.data.reviews[i].user_id == req.session.user_id : false;
  }*/
    //TODO show delete button
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

  public book(form): void {
    var date1 = new Date((<HTMLInputElement>document.getElementById("date-from")).value);
    var date2 = new Date((<HTMLInputElement>document.getElementById("date-to")).value);
    if (!this.validate_dates(date1, date2)) {
      this.alert_error ="Please enter valid dates!"
      this.openModal();
    } else if (this.avtentikacijaStoritev.get_current_user()==null){
      this.alert_error = "Please log in before booking!";
      this.openModal();
    } 
    else {
      this.router.navigateByUrl("/book/" + this.vehicleId);
      this.bookService.book(this.user, this.avtentikacijaStoritev.get_current_user(), this.vehicle, date1, date2 );
    }
  }

  public avg_rating: Number;
  public owner_id: String;
  public vehicleId: string; //on purpose!
  public alert_error: String;
  public vehicle: Vehicle;
  public user: User;
  public car_photos: any;
  public indicators: any;
  public user_logged = true;
  public is_favourite_of_logged_user: boolean;

  ngOnInit(): void {
    this.vehicleId = this.pot.snapshot.paramMap.get('idVehicle');
    this.get_vehicle_data(this.vehicleId);
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  public favorite() {
    var heart = (<HTMLInputElement>document.getElementById("favorite"));
    if (heart.className == "far fa-heart") {
      heart.className = "fas fa-heart";
      this.user.favourite_vehicles_ids.push(this.vehicleId);
      this.usersDataService.updateUserData(this.user).then((user: User)=> {
        this.alert_error = (user != null) ? "" : "Failed to update user";
        this.user = user;
      });
    } else {
      heart.className = "far fa-heart";
      var index = this.user.favourite_vehicles_ids.indexOf("this.vehicleId");
      if (index > -1) 
        this.user.favourite_vehicles_ids.splice(index, 1);
      this.usersDataService.updateUserData(this.user).then((user: User)=> {
        this.alert_error = (user != null) ? "" : "Failed to update user";
        this.user = user;
      });
    }
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

  public appendToForm (){
    var dateForm = (<HTMLInputElement>document.getElementById("date-from"));
    var dailyPrice = (<HTMLInputElement>document.getElementById("daily-price"));
    //debugger;
    this.addHiddenInput(dateForm,dailyPrice.innerText,"daily-price")
    var fullnameHtml = (<HTMLInputElement>document.getElementById("fullname"));
    if (fullnameHtml!=null) {
        var fullname = fullnameHtml.innerText;
        var i = fullname.indexOf(' ');
        var firstname = fullname.substring(0, i);
        var lastname = fullname.substring(i);
        this.addHiddenInput(dateForm,firstname,"firstname");
        this.addHiddenInput(dateForm,lastname,"lastname");
    }
    var phoneHtml = (<HTMLInputElement>document.getElementById("phone"));
    var phone = "";
    if (phoneHtml!=null) phone= phoneHtml.innerText;
    var emailHtml = (<HTMLInputElement>document.getElementById("email"));
    var email = "";
    if (emailHtml!=null) email= emailHtml.innerText;
    var locationHtml = (<HTMLInputElement>document.getElementById("location"));
    if (locationHtml!=null) {
        var location = locationHtml.innerText;
        this.addHiddenInput(dateForm,location,"location");
    }
    var username = (<HTMLInputElement> document.getElementsByClassName("blockquote-footer")[0]).innerText;
    var vehicle_picture = (<HTMLInputElement> document.getElementsByClassName("carousel-item")[0]).children[0].getAttribute("src");
    var descriptionChild = (<HTMLInputElement> document.getElementsByClassName("blockquote")[0]).children[0];
    var descriptionText = (<HTMLInputElement>descriptionChild).innerText;
    
    if (phone!="") this.addHiddenInput(dateForm,phone,"phone");
    if (email!="") this.addHiddenInput(dateForm,email,"email");
    this.addHiddenInput(dateForm,username,"username");
    this.addHiddenInput(dateForm,vehicle_picture,"vehicle_picture");
    this.addHiddenInput(dateForm,descriptionText,"description");
}

  public addHiddenInput(form, string, inputName){
    var child = document.createElement('input');
    child.setAttribute("type", "hidden");
    child.setAttribute("name",inputName);
    child.setAttribute("value",string);
    form.appendChild(child);
}

}
