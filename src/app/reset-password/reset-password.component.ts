import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  user_info = {
  	password: '',
  	password_confirmation: ''
  }

  constructor() { }

  ngOnInit() {
  }

  public submit_request() {
  	console.log(this.user_info);
  }

}
