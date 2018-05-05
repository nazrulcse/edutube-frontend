import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthenticationService } from '../authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

let credentia = {
  email: '',
  password: '',
  remember_me: false
}

export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthenticationService) {

  }

  ngOnInit() {
  }

  public login() {
    this.authService
      .login()
      .subscribe(() => this.router.navigateByUrl('/'));
  }

}
