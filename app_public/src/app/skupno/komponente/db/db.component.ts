import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../storitve/avtentikacija.service';
import { DbService } from '../../storitve/db.service';

@Component({
  selector: 'app-db',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})
export class DbComponent implements OnInit {

  constructor(private dbService: DbService, private authenticationService: AuthenticationService, private router:Router) { }

  public statusText: string;
  public statusType: number; //0 warning, 1 danger, 2 success
  public addSampleData():void {
    this.statusText="Adding data in database..."
    this.statusType = 0;
    this.dbService.addSampleData().then(()=>{
      this.statusType = 2;
      this.statusText="Data added successfully!";
    }).catch(err => {
      this.statusType = 1;
      this.statusText ="Error while adding data!"
      console.error(err)
    });
  }

  public deleteAllData() :void {
    this.statusText="Deleting data in database..."
    this.statusType = 0;
    this.dbService.deleteAllData().then(()=>{
      this.statusType = 2;
      this.statusText="Data deleted successfully!";
    }).catch(err => {
      this.statusType = 1;
      this.statusText ="Error while deleting data!"
      console.error(err)
    });
  }

  ngOnInit(): void {
    var user = this.authenticationService.get_current_user();
    if (user==null || !user.is_admin) this.router.navigateByUrl("/error");
  }

}
