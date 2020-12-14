import { Component, OnInit, Input } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AvtentikacijaService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private usersDataService: UsersDataService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
      });
  }

  private update_user_data = (): void => {
    this.alert_error = "Updating user data";
    this.usersDataService
      .updateUserData()
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
      });
  }

  public vrniUporabnika(): string {
    const { ime } = this.avtentikacijaStoritev.vrniTrenutnegaUporabnika();
    return ime ? ime : 'Gost';
  }

  @Input() id_of_user: String;
  alert_error: String;
  user: User;


  ngOnInit(): void {
    this.get_user_data(this.id_of_user);
  }

}
