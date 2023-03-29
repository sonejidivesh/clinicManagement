import { Component, OnInit } from '@angular/core';
import { IDoctor } from '../model/doctor.model';
import { DoctorService } from './doctor-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers:[DoctorService]
})
export class DoctorListComponent implements OnInit {

  public doctorsList :IDoctor[]= [];
  constructor(private doctorService:DoctorService ,private router:Router) { }

  ngOnInit(): void {

    this.getListDoctors();
  }


  getListDoctors(){
    this.doctorService.getListOfDoctors().subscribe(data => this.doctorsList = data);

  }

  

}




