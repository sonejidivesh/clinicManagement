import{Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Login } from '../model/login.model';
import { map,tap } from 'rxjs/operators';
import{Subject} from 'rxjs';



@Injectable({

    providedIn:'root'
})
export class AuthService{

  private _loginSub = new Subject<void>();

    private apiUrl = 'http://apicodepiepline-env.eba-ecpienbe.us-east-1.elasticbeanstalk.com/api';
   


    get loginSub(){
      return this._loginSub;
    }
    constructor(private http: HttpClient) { }
  
    login(username: string, password: string) {
      const url = `${this.apiUrl}/DoctorLogin`;
      const body = { doctorName: username, password: password };
      return this.http.post<Login>(url, body).pipe(map(user => {
          if(user){
            localStorage.setItem('currentUser',JSON.stringify(user));
            
          }
          return user;
      }),
      tap(()=>{this._loginSub.next()}));
    }


    logout() { 
        localStorage.removeItem('currentUser');
        this._loginSub.next();
     }

}