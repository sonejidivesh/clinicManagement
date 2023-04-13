import{Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Login } from '../model/login.model';


@Injectable({

    providedIn:'root'
})
export class AuthService{

    private apiUrl = 'http://apicodepiepline-env.eba-ecpienbe.us-east-1.elasticbeanstalk.com/api';

    constructor(private http: HttpClient) { }
  
    login(username: string, password: string) {
      const url = `${this.apiUrl}/DoctorLogin`;
      const body = { doctorName: username, password: password };
      return this.http.post<Login>(url, body);
    }

}