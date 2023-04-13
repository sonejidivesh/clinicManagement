import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {IDoctor } from "../model/doctor.model";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Appointment } from "../model/appointment.model";
import { Subject } from "rxjs";

@Injectable()
export class DoctorService{

 private _appointmentSub = new Subject<void>();

    private apiUrl = 'http://apicodepiepline-env.eba-ecpienbe.us-east-1.elasticbeanstalk.com/';

     httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    constructor(private http:HttpClient){  }

    get appointmentSub(){
      return this._appointmentSub;
    }
   

    getListOfDoctors(): Observable<IDoctor[]>{

       return this.http.get<IDoctor[]>(this.apiUrl+'api/Doctor')

    }

    getDoctorDetails(id:number):Observable<IDoctor>{

        return this.http.get<IDoctor>(this.apiUrl+'api/Doctor/'+id)
    }

    bookAppointment(appointment:Appointment): Observable<any> {
       return this.http.post<any>(this.apiUrl+'api/Appointment', appointment,this.httpOptions).pipe(
        tap(()=>{this._appointmentSub.next()
        })
       );
         
      }

      getAllAppoiintments(doctorId:number){
        return this.http.get<Appointment[]>(this.apiUrl+'Apointment-List-Doctor/'+doctorId);
      }



}