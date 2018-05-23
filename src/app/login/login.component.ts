import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Notification } from "../../services/notification";
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
  success = '';
  sub: any;
  user = {};
  
  constructor(private router: Router,
    private authService: AuthenticationService,
    private events: EventService,
    public _sauth: AuthService) {   
  }

  ngOnInit() { }

  signInWithSocial(provider): void {
    var app_provider = FacebookLoginProvider.PROVIDER_ID
    if (provider == 'google') {
      app_provider = GoogleLoginProvider.PROVIDER_ID
    }
    this._sauth.signIn(app_provider).then(user => {
      console.log(user);
      let data = {
        first_name: user.name,
        last_name: '',
        id: user.id,
        provider: user.provider,
        email: user.email,
        picture: user.photoUrl,
        token: user.authToken
      }
      this.authService.socialLogin(data).subscribe(response => {
        if(response.success) {
           this.authService.saveAccessData(response.token, "", response.user, response.expires_in);
           this.events.emitAuthEvent(true);
           Notification.show('success', "Signin successfully");
           $('#login-modal').modal('hide');
           this.router.navigateByUrl('/profile')
        }
        else {
          Notification.show('error', "Unable to login! Please try after sometimes");
        }
      },
      err => {
        Notification.show('error', "Unable to login! Please try after sometimes");
      });
    });
  }

  signInWithFB(): void {
    this._sauth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  public onSubmit() {
    this.login(this.credential);
  }

  public login(credential) {
    this.authService
      .login(credential).subscribe(
        data => {
          if(data.success) {
              this.authService.saveAccessData(data.token, "", data.user, data.expires_in);
              this.events.emitAuthEvent(true);
              $('#login-modal').modal('hide');
              Notification.show('success', "Signin successfully");
              this.router.navigateByUrl('/profile');
          }
          else {
            Notification.show('error',  data.message, {positionClass: 'toast-top-center'});
          }
        },
        err =>  { 
          console.log(err);
          Notification.show('error', "Unable to login! Please try after sometimes");
        }
      );
  }

}
