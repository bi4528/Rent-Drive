import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { Router } from '@angular/router';
import { HistoryService } from '../../storitve/history.service';
import { ValidationService } from '../../storitve/validation.service';
import { ModalComponent } from '../modal/modal.component';
import { PovezavaService } from '../../storitve/povezava.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private validationService: ValidationService,
    private povezavaStoritev: PovezavaService,
    private router: Router,
    private avtentikacijaStoritev: AuthenticationService,
    private historyService: HistoryService) { }

  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }

  public login = (): void => {
    this.status = "Trying to login...";
    this.modal_text = "";

    if (
      !this.user.email ||
      !this.user.password
    ) {
      this.modal_text = "To proceed you have to insert all data";
      this.openModal();
    } else if (!this.validationService.validate_email(this.user.email)) {
      this.modal_text = "Email or password not valid!";
      this.openModal();
    } else {
      this.avtentikacijaStoritev
        .login(this.user)
        .then(() => {
          this.modal_text = "";
          this.router.navigateByUrl(
            this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()
          )
        })
        .catch(message => {
          this.modal_text = "Email or password not valid!";
          this.openModal();
        });
    }
    this.status = "";
    this.modal_text = "";
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }
  status: String;
  modal_text: String;
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
