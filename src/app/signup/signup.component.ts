import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';
declare var $ :any;

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
    is_teacher: false,
    user_type: 'student'
  }
  errors = [];
  message = '';

  constructor(private router: Router,
    private authService: AuthenticationService,
    private events: EventService) { }

  public registration() {
    if(this.user_info.is_teacher) {
      this.user_info.user_type = 'teacher';
    }
    else {
     this.user_info.user_type = 'student'; 
    }
    this.authService
      .registration(this.user_info).subscribe(
        data => {
          if(data.success) {
            this.authService.saveAccessData(data.token, "", data.user);
            this.events.emitAuthEvent(true);
            $('#registration-modal').modal('hide');
            this.router.navigateByUrl('/profile/edit');
          }
          else {
            this.errors = Object.values(data.errors);
          }
        },
        err =>  { 
          this.message = "Something wrong! Please try after sometimes";
        }
      );
  }

  ngOnInit() {
  }

}
