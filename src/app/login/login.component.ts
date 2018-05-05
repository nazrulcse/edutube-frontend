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
  
  constructor(private router: Router,
    private authService: AuthenticationService) {   
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.credential);
  }

  public login() {
    this.authService
      .login()
      .subscribe(() => this.router.navigateByUrl('/'));
  }

}
