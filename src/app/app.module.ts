import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-list/doctor-details/doctor-details.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './home/home.component';
import { DoctorButtonComponent } from './doctor-list/doctor-button/doctor-button.component';
import { AppointmentComponent } from './doctor-list/doctor-details/appointment/appointment.component';
import { ModalModule } from 'ngx-bootstrap/modal';


//these are the routes
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    DoctorListComponent,
    DoctorDetailsComponent,
    NavigationComponent,
    HomeComponent,
    DoctorButtonComponent,
    AppointmentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    //this will register the routes
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
