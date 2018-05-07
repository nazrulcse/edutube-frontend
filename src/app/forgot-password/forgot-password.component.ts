import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user_info = {email: ''}
  message = "";
  error = '';
  constructor(private router: Router,
    private authService: AuthenticationService,
    private events: EventService) { }

  ngOnInit() {
  }

  public submit_request() {
  	this.authService
      .recover(this.user_info.email).subscribe(
        data => {
          console.log(data);
          if(data.success) {
            this.message = data.message;
            this.error = '';
          }
          else {
            this.error = data.message;
            this.message = '';
          }
        },
        err =>  { 
          console.log(err);
          this.message = '';
          this.error = "Something wrong! Please try after sometimes.";
        }
      );
  }

}
