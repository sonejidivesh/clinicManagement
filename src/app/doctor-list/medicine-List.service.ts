import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicine } from 'src/app/model/medicine.model';
import { Prescrition } from 'src/app/model/prescription.model';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import{tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class MedicineSerivice{

    private _medicineSub = new Subject<void>();
    private apiUrl = "https://nnk9yvhtcj.execute-api.us-east-1.amazonaws.com";
    private testUrl = "https://localhost:7036";
    private personalUrl = "http://apicodepiepline-env.eba-ecpienbe.us-east-1.elasticbeanstalk.com";
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS,*',
        'Access-Control-Allow-Headers': 'Content-Type'
        })
      };
    constructor(private http: HttpClient) { }

    get medicineSub(){
        return this._medicineSub;
    }
    getMedicineList(){
        return this.http.get<Medicine[]>(this.apiUrl+"/dev/medicine");
    }

    addPrescription(pescrition:Prescrition) : Observable<any>{
        return this.http.post<any>(this.testUrl+"/api/Prescription",pescrition,this.httpOptions).pipe(
            tap(()=>{
            this.medicineSub.next()
        })
        );
    }


    getPrescription(appointmentId:number){
        return this.http.get<Prescrition>(this.testUrl+"/api/Prescription/"+appointmentId,this.httpOptions)
    }

    

}