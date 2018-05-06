import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user_info = {
  	name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: false
  }
  errors = [];

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  public registration() {
    this.authService
      .registration(this.user_info).subscribe(
        data => {
          //this.loader.dismiss();
          if(data.success) {
            this.authService.saveAccessData("ss", "ss");
          }
          else {
            console.log(data.errors);
            this.errors = Object.values(data.errors);
          }
          console.log(data);
        },
        err =>  { 
          this.errors = err;
          //this.loader.dismiss();
        }
      );
  }

  ngOnInit() {
  }

}
