import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { HistoryService } from '../../storitve/history.service';
import { ValidationService } from '../../storitve/validation.service';

import { $ } from "jquery";
import { ModalComponent } from '../modal/modal.component';
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
    this.status = "Trying to login..."; //login attempt start
    this.alert_error = "Trying to login...";

    if (
      !this.user.email ||
      !this.user.password
    ) {
      this.alert_error = "To proceed you have to insert all data";
      this.openModal();
    } else if (!this.validationService.validate_email(this.user.email)) {
      this.alert_error = "Email or password not valid!";
      this.openModal();
    } else {
      this.avtentikacijaStoritev
        .login(this.user)
        .then(() => {
          this.alert_error="";
          this.router.navigateByUrl(
            this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
          )
        })
        .catch(message => {
          this.alert_error = "Email or password not valid!";
          this.openModal();
        } );
    }
    this.status="";
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }
  status: String;
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
