import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {IDoctor } from "../model/doctor.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Appointment } from "../model/appointment.model";

@Injectable()
export class DoctorService{

    constructor(private http:HttpClient){  }

    getListOfDoctors(): Observable<IDoctor[]>{

       return this.http.get<IDoctor[]>('https://localhost:7036/api/Doctor')

    }

    getDoctorDetails(id:number):Observable<IDoctor>{

        return this.http.get<IDoctor>('https://localhost:7036/api/Doctor/'+id)
    }

    bookAppointment(appointment:Appointment): Observable<any> {
       return this.http.post<any>('https://localhost:7036/api/Appointment', appointment)
         
      }


}