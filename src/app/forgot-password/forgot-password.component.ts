import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';
import {Notification} from '../../services/notification';

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
            Notification.show('success', data.message);
          }
          else {
            Notification.show('error', data.message);
          }
        },
        err =>  { 
          console.log(err);
          Notification.show('error');
        }
      );
  }
}
