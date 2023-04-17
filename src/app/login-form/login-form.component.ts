import { Component } from '@angular/core';
import { AuthService } from '../login-form/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  model = {
    doctorName: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form:NgForm) {
    this.authService.login(this.model.doctorName,this.model.password).pipe(map(user=>{
      if(user){
        localStorage.setItem('currentUser',JSON.stringify(user));
      }
      return user;

    })).subscribe((data) => {
        this.router.navigate(['doctors',data.doctorDetails.id]);
        console.log(data);
      }
    );
  }


}
