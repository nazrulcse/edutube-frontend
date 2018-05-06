import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  credential = {
      email: '',
      password: '',
      remember: false
  }
  errors = [];
  message = "";
  
  constructor(private router: Router,
    private authService: AuthenticationService) {   
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.login(this.credential);
  }

  public login(credential) {
    this.authService
      .login(credential).subscribe(
        data => {
          //this.loader.dismiss();
          if(data.success) {
            this.authService.saveAccessData("ss", "ss");
            this.router.navigateByUrl('/profile');
          }
          else {
            this.message = data.message;
          }
          console.log(data);
        },
        err =>  { 
          this.errors = err;
          //this.loader.dismiss();
        }
      );
  }

}
