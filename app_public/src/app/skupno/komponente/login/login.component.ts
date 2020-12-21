import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { HistoryService } from '../../storitve/history.service';
import { ValidationService } from '../../storitve/validation.service';

import { $ } from "jquery";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private validationService: ValidationService,
    private router: Router, private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService, private historyService: HistoryService) { }


  public login = (): void => {

    this.alert_error = "";

    if (
      !this.user.email ||
      !this.user.password
    ) {
      this.alert_error = "To proceed you have to insert all data";
      //$("#modal").modal();
    } else if (!this.validationService.validate_email(this.user.email)) {
      this.alert_error = "Email is not valid";
    } else {

      this.alert_error = "Email is valid. Trying to login";
      this.avtentikacijaStoritev
        .login(this.user)
        .then(() => {
          this.router.navigateByUrl(
            this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
          )
        })
        .catch(sporocilo => this.alert_error = sporocilo);
    }
  }


  alert_error: String;
  public user: User = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    profile_picture: "",
    location: "",
    favourite_vehicles_ids: [],
    is_admin: false,
  };


  ngOnInit(): void {
  }

}
