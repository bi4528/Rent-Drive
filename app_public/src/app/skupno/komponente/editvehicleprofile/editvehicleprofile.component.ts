import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../razredi/user';
import { Vehicle } from '../../razredi/vehicle';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { ValidationService } from '../../storitve/validation.service';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-editvehicleprofile',
  templateUrl: './editvehicleprofile.component.html',
  styleUrls: ['./editvehicleprofile.component.css']
})
export class EditvehicleprofileComponent implements OnInit {


  constructor(private validationService: ValidationService, private router: Router, private pot: ActivatedRoute, private vehicleDataService: VehiclesDataService, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService, private elementRef: ElementRef) { }

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
        if (this.avtentikacijaStoritev.get_current_user()==null || this.vehicle.owner_id != this.avtentikacijaStoritev.get_current_user()._id) this.router.navigateByUrl("/error");
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

  public edit(): void {
    this.alert_error = "Editing vehicle...";
    var writeError = false;
    var errors = "";
    var images = <HTMLInputElement>document.getElementById("images");
    var maxspeed = <HTMLInputElement>document.getElementById("maxspeed");
    var hp = <HTMLInputElement>document.getElementById("hp");
    var acceleration = <HTMLInputElement>document.getElementById("acceleration");
    var consumption = <HTMLInputElement>document.getElementById("consumption");
    var seats = <HTMLInputElement>document.getElementById("seats");
    var doors = <HTMLInputElement>document.getElementById("doors");
    var price = <HTMLInputElement>document.getElementById("price");
    var make = <HTMLInputElement>document.getElementById("make");
    var model = <HTMLInputElement>document.getElementById("model");
    var luggage = <HTMLInputElement>document.getElementById("luggage");
    var addres = <HTMLInputElement>document.getElementById("addres");
    var zip = <HTMLInputElement>document.getElementById("zip");
    var description = <HTMLInputElement>document.getElementById("description");
    var date1 = <HTMLInputElement>document.getElementById("date-from");
    var date2 = <HTMLInputElement>document.getElementById("date-to");
    var typeoffuel = <HTMLInputElement>document.getElementById("typeoffuel");
    if (typeoffuel == null) {
      make.classList.add("alert-danger");
      errors += "Type of fuel not specified.\n";
      writeError = true;
    } else this.vehicle.typeoffuel = typeoffuel.value;
    if (!this.validationService.validate_vehicle_make(make.value)) {
      make.classList.add("alert-danger");
      errors += "Make should have only letters.\n";
      writeError = true;
    } else this.vehicle.make = make.value;
    if (!this.validationService.validate_not_empty_string(model.value)) {
      model.classList.add("alert-danger");
      errors += "Model text field should not be empty.\n";
      writeError = true;
    } else this.vehicle.model = model.value;
    if (!this.validationService.validate_vehicle_horespower(hp.value)) {
      hp.classList.add("alert-danger");
      errors += "Horespower should be only numbers.\n";
      writeError = true;
    } else this.vehicle.hp = +hp.value;
    if (!this.validationService.validate_vehicle_speed(maxspeed.value)) {
      maxspeed.classList.add("alert-danger");
      errors += "Maxspeed should be only numbers.\n";
      writeError = true;
    } else this.vehicle.maxspeed = +maxspeed.value;
    if (!this.validationService.validate_acceleration(acceleration.value)) {
      acceleration.classList.add("alert-danger");
      errors += "Acceleration should be written in the next format => number.number or just a number(s).\n";
      writeError = true;
    } else this.vehicle.acceleration = +acceleration.value;
    if (!this.validationService.validate_not_empty_string(consumption.value) && consumption.disabled == false) {
      consumption.classList.add("alert-danger");
      errors += "Consumption field must not be empty, except if the vehicle is electric\n";
      writeError = true;
    } else this.vehicle.consumption = +consumption.value;
    if (!this.validationService.validate_vehicle_doors_seats(seats.value)) {
      seats.classList.add("alert-danger");
      errors += "Number of seats is only one number.\n";
      writeError = true;
    } else this.vehicle.seats = +seats.value;
    if (!this.validationService.validate_vehicle_doors_seats(doors.value)) {
      doors.classList.add("alert-danger");
      errors += "Number of doors is only one number.\n";
      writeError = true;
    } else this.vehicle.doors = +doors.value;
    if (!this.validationService.validate_vehicle_price_per_day(price.value)) {
      price.classList.add("alert-danger");
      errors += "Price must be between 1 and 5000.\n";
      writeError = true;
    } else this.vehicle.price = +price.value;
    if (!this.validationService.validate_vehicle_luggage(luggage.value)) {
      luggage.classList.add("alert-danger");
      errors += "Luggage capacity must be a positive number\n";
      writeError = true;
    } else this.vehicle.luggage = +luggage.value;
    if (!this.validationService.validate_not_empty_string(addres.value)) {
      addres.classList.add("alert-danger");
      errors += "You must insert an address.\n";
      writeError = true;
    } else this.vehicle.addres = addres.value;
    if (!this.validationService.validate_vehicle_number_of_doors(zip.value)) {
      zip.classList.add("alert-danger");
      errors += "You must insert a zip.\n";
      writeError = true;
    } else this.vehicle.zip = +zip.value;
    if (!this.validationService.validate_not_empty_string(description.value)) {
      description.classList.add("alert-danger");
      errors += "You must insert a description.\n";
      writeError = true;
    } else this.vehicle.description = description.value;
    if (!this.validationService.validate_dates(date1.value, date2.value)) {
      date1.classList.add("alert-danger");
      date2.classList.add("alert-danger");
      errors += "Insert valid dates.\n";
      writeError = true;
    } else {
      this.vehicle.date[0] = date1.value;
      this.vehicle.date[1] = date2.value;
    }
    if (writeError) {
      this.alert_error = errors;
      this.openModal();
    } else {
      if (images.files.length > 0) {
        var formData = new FormData();
        debugger;
        for (let i = 0; i < images.files.length; i++) {
          formData.append(images.files[i].name, images.files[i]);
        }

        for (let i = 0; i < images.files.length; i++) {
          console.log(images.files[i].name);
          this.vehicle.images.push(images.files[i].name);
        }
        debugger;
        console.log(formData);
        this.vehicleDataService
          .vehicleImagesUpload(formData)
          .then((data) => {
            console.log("IMAGES WERE SUCCESFULY UPLOADED", data);
            this.vehicleDataService
              .updateVehicleData(this.vehicle)
              .then((data) => {
                console.log("PUBLISED", data);
                this.router.navigateByUrl("/vehicles/" + this.vehicleId);
              })
              .catch(napaka => this.alert_error = napaka);
          })
          .catch(napaka => console.log(napaka));
      } else {
        this.vehicleDataService.updateVehicleData(this.vehicle).then((vehicle: Vehicle) => {
          this.alert_error = (vehicle != null) ? "" : "Failed to update vehicle";
          this.vehicle = vehicle;
          this.router.navigateByUrl("/vehicles/" + this.vehicleId);
        })
      }
    }
    this.alert_error = "";
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  public avg_rating: Number;
  public owner_id: String;
  public vehicleId: String;
  public alert_error: String;
  public vehicle: Vehicle;
  public user: User;
  public car_photos: any;
  public indicators: any;
  public user_logged = true;
  ngOnInit(): void {
    this.vehicleId = this.pot.snapshot.paramMap.get('idVehicle');
    this.get_vehicle_data(this.vehicleId);
  }

}
