import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';
declare var $ :any;

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
    private authService: AuthenticationService,
    private events: EventService) {   
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
          if(data.success) {
            this.authService.saveAccessData(data.token, "", data.user);
            this.events.emitAuthEvent(true);
            $('#login-modal').modal('hide');
            this.router.navigateByUrl('/profile');
          }
          else {
            this.message = data.message;
          }
        },
        err =>  { 
          console.log(err);
          this.message = "Something wrong! Please try after sometimes.";
        }
      );
  }

}
