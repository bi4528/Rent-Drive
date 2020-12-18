import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Vehicle } from '../../razredi/vehicle';
import { User } from '../../razredi/user';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-vehicleprofile',
  templateUrl: './vehicleprofile.component.html',
  styleUrls: ['./vehicleprofile.component.css']
})
export class VehicleProfileComponent implements OnInit {

  constructor(
    private router: Router, private pot: ActivatedRoute, private vehicleDataService: VehiclesDataService, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService) { }

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


  public setCarPhotosAndIndicators(images:string[]): void {
    for (var i = 0; i < images.length; i++) {
      if (i == 0) {
        this.car_photos = [];
        this.indicators = [];
        this.car_photos.push({ "image": images[i], "active": "active" });
        this.indicators.push({ "num": i.toString(), "active": "class='active'" });
      }
      else {
        this.car_photos.push({ "image": images[i] });
        this.indicators.push({ "num": i.toString() });
      }
    }
  }


  public book():void {
    return; //TODO
  }


  public owner_id: String;
  public vehicleId: String;
  public alert_error: String;
  public vehicle: Vehicle;
  public user: User;
  public car_photos: any;
  public indicators: any;
  public user_logged = true;
  public is_favourite_of_logged_user = this.avtentikacijaStoritev.is_logged;
  
  ngOnInit(): void {
    this.vehicleId = this.pot.snapshot.paramMap.get('idVehicle');
    this.get_vehicle_data(this.vehicleId);

  }


}
