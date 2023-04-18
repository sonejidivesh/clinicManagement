import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login-form/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  islLoggedIn = false;
 

  constructor(public route:Router, private auth:AuthService) { 
  }

  ngOnInit(): void {

    this.auth.loginSub.subscribe(()=>{

      this.islLoggedIn = this.getIsLoggedIn();
    })

 
  }


  getIsLoggedIn(){
    return localStorage.getItem('currentUser') ? true : false;
  }
 

  logout() {
    this.auth.logout();  
    this.route.navigate(['login']);
  }
}



