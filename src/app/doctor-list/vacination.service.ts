import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vacinnation } from '../model/vacinnation.model';

@Injectable({
    providedIn:'root'
})
export class VacinationService{

    private apiUrl = "https://qt6xfeyzbg.execute-api.us-east-1.amazonaws.com/";

    constructor(private http:HttpClient) { }



    getVacinationList(){

        return this.http.get<Vacinnation[]>(this.apiUrl+"dev/availvaccines");
    }

}