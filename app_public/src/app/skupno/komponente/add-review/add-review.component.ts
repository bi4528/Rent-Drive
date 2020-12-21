import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router'
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute , ParamMap} from '@angular/router';
import {VehiclesDataService} from '../../storitve/vehicles-data.service'
import {AuthenticationService} from '../../storitve/avtentikacija.service'
import {Vehicle} from '../../razredi/vehicle'

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private vehiclesDataService: VehiclesDataService, private avtentikacijaStoritev: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  @Input() img:string;
  @Input() username:string;
  @Input() id:string;
  public newReview = {
    comment: '',
    stars: '',
    rating: '',
    user_id: '',
    username: 'unknown',
    img: '../../../../assets/uploads/oseba_template_2.jpg'
  };
  public error: string;
  public addNewVehicle():void{}

  onFormSubmit(form: NgForm) {
    //console.log("HELLO WELCOME");
    this.newReview.username = this.username;
    this.newReview.img = this.img;
    this.newReview.stars = form.controls['stars'].value;
    //this.newReview.user_id = this.id;
    console.log(this.newReview.comment, " ", this.newReview.stars);
    if (this.newReview.stars === '1') {
      this.newReview.rating = "★☆☆☆☆";
    }
    else if (this.newReview.stars === '2') {
      this.newReview.rating = "★★☆☆☆";
    }
    else if (this.newReview.stars === '3') {
      this.newReview.rating = "★★★☆☆";
    }
    else if (this.newReview.stars === '4') {
      this.newReview.rating = "★★★★☆";
    }
    else {
      this.newReview.rating = "★★★★★";
    }
    this.newReview.user_id = this.avtentikacijaStoritev.get_current_user()._id;
    console.log(this.newReview.user_id);
    debugger;
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let idVehicle = params.get('idVehicle');
          return this.vehiclesDataService.getVehicle(idVehicle)
        })
      )
      .subscribe((vehicle: Vehicle) => {
        this.vehiclesDataService
        .postReview(this.newReview, vehicle._id)
        .then((data) => {
          console.log("PUBLISED", data);
          this.router.navigateByUrl("/");
        })
        .catch(napaka => this.error = napaka);
      })
  }

  ngOnInit(): void {}

}
