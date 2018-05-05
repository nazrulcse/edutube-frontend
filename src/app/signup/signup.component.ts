import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  public registration() {
    console.log(this.user_info);
  }

  ngOnInit() {
  }

}
