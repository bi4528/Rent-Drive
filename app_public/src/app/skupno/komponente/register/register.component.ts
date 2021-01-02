import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ValidationService } from '../../storitve/validation.service';
import { ModalComponent } from '../modal/modal.component';
import { HistoryService } from '../../storitve/history.service';
import { PovezavaService } from '../../storitve/povezava.service';
declare var validate: any;
declare var register: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private povezavaStoritev: PovezavaService,
    private avtentikacijaStoritev: AuthenticationService,
    private validationService: ValidationService,
    private historyService: HistoryService
  ) { }
  public jePovezava(): boolean {
    return this.povezavaStoritev.jePovezava;
  }
  modal_text: String;
  @ViewChild("repeatPassword") repeatPassword;

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

  public statusText: string;
  public statusType: number;

  public register = (): void => {
    this.statusText = "Registration in progress...";
    this.statusType = 0;
    this.modal_text = "";
    var writeError = false;

    if (
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email ||
      !this.user.username ||
      !this.user.password ||
      !this.repeatPassword.nativeElement.value
    ) {
      this.modal_text = "Fill all the input fields to register successfully!";
      this.openModal();
    } else {
      if (this.repeatPassword.nativeElement.value != this.user.password) {
        this.modal_text += "Passwords not equal!\n";
        writeError = true;
      }
      if (!this.validationService.validate_first_name(this.user.firstname)) {
        this.modal_text += "First name contains only letters.\n";
        writeError = true;
      } if (!this.validationService.validate_last_name(this.user.lastname)) {
        this.modal_text += "Last name contains only letters.\n";
        writeError = true;
      } if (!this.validationService.validate_email(this.user.email)) {
        this.modal_text += "Email not valid!\n";
        writeError = true;
      } if (!this.validationService.validate_username(this.user.username)) {
        this.modal_text += "Username contains 4-15 alphanumericals, without spaces or '_' '.' at the beginning or end\n";
        writeError = true;
      }
      if (!this.validationService.validate_password(this.user.password)) {
        this.modal_text += "Password must contain 6 alphanumericals, at least one uppercase, at least one lowercase and at least one 'special character' (e.g. number).";
        writeError = true;
      }
      this.statusText = "";
      if (writeError) this.openModal();
      else {
        this.avtentikacijaStoritev.register(this.user)
          .then(() => {
            this.statusText = "Success!";
            this.statusType = 2;
            this.router.navigateByUrl("/" );
            //this.router.navigateByUrl("this.historyService.vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije()");
          })
          .catch(sporocilo => {
            this.modal_text = sporocilo;
            this.openModal();
          })
      }
    }
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnInit(): void {
  }

}
