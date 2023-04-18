import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-list/doctor-details/doctor-details.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HomeComponent } from './home/home.component';
import { DoctorButtonComponent } from './doctor-list/doctor-button/doctor-button.component';
import { AppointmentComponent } from './doctor-list/doctor-details/appointment/appointment.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppointmentListComponent } from './doctor-list/appointment-list/appointment-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginFormComponent } from './login-form/login-form.component';
import { PrescriptionComponent } from './doctor-list/appointment-list/prescription/prescription.component';
import {DataTablesModule} from 'angular-datatables';





//these are the routes
const appRoutes: Routes = [
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/:id', component: DoctorDetailsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
  { path: '', redirectTo: '/doctors', pathMatch: 'full' }
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
    AppointmentListComponent,
    LoginFormComponent,
    PrescriptionComponent,

 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DataTablesModule,
    ModalModule.forRoot(),
    //this will register the routes
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
