import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user_info = {email: ''}
  constructor() { }

  ngOnInit() {
  }

  public submit_request() {
  	console.log(this.user_info);
  }

}
