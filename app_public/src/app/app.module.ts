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
import { NearbyVremeComponent } from './skupno/komponente/nearby-vreme/nearby-vreme.component';
import { NearbyComponent } from './skupno/komponente/nearby/nearby.component';
import { SimplePipePipe } from './skupno/cevi/simple-pipe.pipe';
import { StarsPipe } from './skupno/cevi/stars.pipe';
import { FeaturehelperPipe } from './skupno/cevi/featurehelper.pipe';
import { ForgotPasswordComponent } from './skupno/komponente/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './skupno/komponente/reset-password/reset-password.component';
import { ReviewsComponent } from './skupno/komponente/reviews/reviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from './skupno/komponente/confirm/confirm.component';
import { BookComponent } from './skupno/komponente/book/book.component';
import { ModalComponent } from './skupno/komponente/modal/modal.component';
import { HtmlPrelomVrsticePipe } from './skupno/cevi/html-prelom-vrstice.pipe';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { AddReviewComponent } from './skupno/komponente/add-review/add-review.component';
import { EditvehicleprofileComponent } from './skupno/komponente/editvehicleprofile/editvehicleprofile.component';
import { NotFoundComponentComponent } from './skupno/komponente/not-found-component/not-found-component.component';


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
    NearbyMapaComponent,
    NearbyVremeComponent,
    NearbyComponent,
    VehicleProfileComponent,
    NearbyMapaComponent,
    SimplePipePipe,
    StarsPipe,
    FeaturehelperPipe,
    ReviewsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmComponent,
    BookComponent,
    ModalComponent,
    HtmlPrelomVrsticePipe,
    AddReviewComponent,
    EditvehicleprofileComponent,
    NotFoundComponentComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgbModule,
        LeafletModule
    ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule { }
