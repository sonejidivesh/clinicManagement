import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Radiology } from '../model/radiology.model';

@Injectable({
    providedIn:'root'
})
export class RadiologyService{

    private apiUrl = "http://medicaltest-env-1.eba-tqwrpxta.us-east-1.elasticbeanstalk.com/";

    constructor(private http:HttpClient) { }



    getRadiologList(){

        return this.http.get<Radiology[]>(this.apiUrl+"TestDetails/");
    }

}