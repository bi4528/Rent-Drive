import { InjectFlags } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../razredi/user';
import { UsersDataService } from '../../storitve/users-data.service';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { ValidationService } from '../../storitve/validation.service';
import { ModalComponent } from '../modal/modal.component';
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
    private usersDataService: UsersDataService,
    private avtentikacijaStoritev: AuthenticationService,
    private validationService: ValidationService
  ) { }

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


  public register = (): void => {

    this.modal_text = "";

    if (
      !this.user.firstname ||
      !this.user.lastname ||
      !this.user.email ||
      !this.user.username ||
      !this.user.password ||
      !this.repeatPassword.nativeElement.value ||
      (this.repeatPassword.nativeElement.value != this.user.password)
    ) {
      this.modal_text = "Fill all the input fields to register successfully!";
      this.openModal();
    } else if (!this.validationService.validate_user(this.user)) {
      this.modal_text = "Inserted data is not valid";
      this.openModal();
    } else {
      this.avtentikacijaStoritev.register(this.user)
        .then(() => {
          this.router.navigateByUrl("/")
        })
        .catch(sporocilo => this.modal_text = sporocilo)
    }
  }

  @ViewChild('modal') public modalComponent: ModalComponent;
  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnInit(): void {
  }

}
