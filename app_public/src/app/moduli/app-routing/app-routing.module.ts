import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'

import { OgrodjeComponent } from '../../skupno/komponente/ogrodje/ogrodje.component';
import { HomeComponent } from '../../skupno/komponente/home/home.component';
import { SearchComponent } from '../../skupno/komponente/search/search.component';
import { PublishComponent} from '../../skupno/komponente/publish/publish.component';
import { LoginComponent } from 'src/app/skupno/komponente/login/login.component';
import { ProfileComponent } from 'src/app/skupno/komponente/profile/profile.component';
import { EditProfileComponent } from 'src/app/skupno/komponente/edit-profile/edit-profile.component';
import { RegisterComponent } from 'src/app/skupno/komponente/register/register.component';
import { VehicleProfileComponent } from 'src/app/skupno/komponente/vehicleprofile/vehicleprofile.component';
import { NearbyMapaComponent } from 'src/app/skupno/komponente/nearby-mapa/nearby-mapa.component';
import { ForgotPasswordComponent } from 'src/app/skupno/komponente/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/skupno/komponente/reset-password/reset-password.component';

const poti: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'vehicles/publish',
    component: PublishComponent
  },
  {
    path: 'users/login',
    component: LoginComponent
  },
  {
    path: 'users/profiles/:idUser',
    component: ProfileComponent
  },
  {
    path: 'users/edit/:idUser',
    component: EditProfileComponent
  }, {
    path: 'users/register',
    component: RegisterComponent
  }, {
    path: 'users/forgot_password',
    component: ForgotPasswordComponent
  }, {
    path: 'users/reset_password/:token',
    component: ResetPasswordComponent
  },{
    path:'vehicles/:idVehicle',
    component: VehicleProfileComponent
  },
  {
    path: 'nearby',
    component: NearbyMapaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
