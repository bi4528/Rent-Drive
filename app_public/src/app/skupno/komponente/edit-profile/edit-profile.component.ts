import { Component, OnInit, Input } from '@angular/core';
import { UsersDataService } from '../../storitve/users-data.service';
import { User } from '../../razredi/user';
import { AuthenticationService } from '../../storitve/avtentikacija.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private usersDataService: UsersDataService, private avtentikacijaStoritev: AuthenticationService) { }

  private get_user_data = (id_of_user: String): void => {
    this.alert_error = "Searching for user";
    this.usersDataService
      .getUser(id_of_user)
      .then((data: User) => {
        this.alert_error = (data == null) ? "" : "No user found";
        this.user = data;
      });
  }

  public update_user_data = (): void => {
    this.alert_error = "Updating user data";
    this.usersDataService
      .updateUserData(this.user)
      .then((user: User) => {
        this.alert_error = (user != null) ? "" : "Failed to update user";
        this.user = user;
      });
  }

  public vrniUporabnika(): string {
    const { username } = this.avtentikacijaStoritev.get_current_user();
    return username ? username : 'Guest';
  }

  @Input() id_of_user: String;
  public alert_error: String;
  public user: User;


  ngOnInit(): void {
    this.get_user_data(this.id_of_user);
  }

}
