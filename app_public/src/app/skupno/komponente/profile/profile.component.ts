import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../razredi/user';
import { Vehicle } from '../../razredi/vehicle';
import { Rent } from '../../razredi/rent';
import { UsersDataService } from '../../storitve/users-data.service';
import { VehiclesDataService } from '../../storitve/vehicles-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private usersDataService: UsersDataService, private vehiclesDataService: VehiclesDataService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
      });
  }

  
  private get_vehicles_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getVehiclesOfUser(id_of_user)
      .then((data: Vehicle[]) => {
        this.alert_error = (data.length > 0) ? "" : "No cars found";
        this.owned_cars = data;
      });
  }

  private get_favourite_vehicles_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getFavouriteVehiclesOfUser(id_of_user)
      .then((data: Vehicle[]) => {
        this.alert_error = (data.length > 0) ? "" : "No cars found";
        this.favourite_cars = data;
      });
  }

  private get_rents_of_user = (id_of_user: String): void => {
    this.alert_error = "Searching for cars";
    this.usersDataService
      .getRentsOfUser(id_of_user)
      .then((data: Rent[]) => {
        this.alert_error = (data.length > 0) ? "" : "No cars found";
        this.rents = data;
      });
  }



  @Input() id_of_user: String;
  alert_error: String;
  user: User;
  owned_cars: Vehicle[];
  favourite_cars: Vehicle[];
  rents: Rent[];

  ngOnInit(): void {
    this.get_user_data(this.id_of_user);
    this.get_vehicles_of_user(this.id_of_user);
    this.get_rents_of_user(this.id_of_user);
    this.get_favourite_vehicles_of_user(this.id_of_user);
  }

}
