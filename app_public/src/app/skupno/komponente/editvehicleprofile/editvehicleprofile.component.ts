import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../razredi/user';
import { Vehicle } from '../../razredi/vehicle';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';

@Component({
  selector: 'app-editvehicleprofile',
  templateUrl: './editvehicleprofile.component.html',
  styleUrls: ['./editvehicleprofile.component.css']
})
export class EditvehicleprofileComponent implements OnInit {
  

  constructor(private router: Router, private pot: ActivatedRoute, private vehicleDataService: VehiclesDataService, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService, private elementRef: ElementRef) { }

  public get_vehicle_data = (vehicleId: String): void => {
    this.alert_error = "Searching for vehicle";
    this.vehicleDataService
      .getVehicle(vehicleId)
      .then((data: Vehicle) => {
        this.alert_error = (data == null) ? "" : "No vehicle found";
        this.vehicle = data;
        console.log(this.vehicle);
        this.get_user_data(this.vehicle.owner_id);
        this.setCarPhotosAndIndicators(this.vehicle.images);
      });
  }

  public get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
        console.log(this.user);
      });
  }

  public setCarPhotosAndIndicators(images: string[]): void {
    debugger;
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
