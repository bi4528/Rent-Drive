import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './moduli/app-routing/app-routing.module';

import { OgrodjeComponent } from './skupno/komponente/ogrodje/ogrodje.component';
import { HomeComponent } from './skupno/komponente/home/home.component';
import { CarouselVehiclesPipe } from './skupno/cevi/carousel-vehicles.pipe';
import { SearchComponent } from './skupno/komponente/search/search.component';
import { PublishComponent } from './skupno/komponente/publish/publish.component';
import { ProfileComponent } from './skupno/komponente/profile/profile.component';
import { EditProfileComponent } from './skupno/komponente/edit-profile/edit-profile.component';
import { LoginComponent } from './skupno/komponente/login/login.component';
import { RegisterComponent } from './skupno/komponente/register/register.component';
import { VehicleProfileComponent } from './skupno/komponente/vehicleprofile/vehicleprofile.component';
import { NearbyMapaComponent } from './skupno/komponente/nearby-mapa/nearby-mapa.component';
import { SimplePipePipe } from './skupno/cevi/simple-pipe.pipe';
import { StarsPipe } from './skupno/cevi/stars.pipe';
import { FeaturehelperPipe } from './skupno/cevi/featurehelper.pipe';
import { ForgotPasswordComponent } from './skupno/komponente/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './skupno/komponente/reset-password/reset-password.component';

import { FileUploadModule } from 'ng2-file-upload';
import { ReviewsComponent } from './skupno/komponente/reviews/reviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OgrodjeComponent,
    HomeComponent,
    CarouselVehiclesPipe,
    SearchComponent,
    PublishComponent,
    ProfileComponent,
    EditProfileComponent,
    LoginComponent,
    RegisterComponent,
    VehicleProfileComponent,
    NearbyMapaComponent,
    SimplePipePipe,
    StarsPipe,
    FeaturehelperPipe,
    ReviewsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
