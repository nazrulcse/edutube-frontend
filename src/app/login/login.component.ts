import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication';
import {EventService} from '../../services/event_service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
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
  user = {}
  
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
        name: user.name,
        id: user.id,
        provider: user.provider,
        email: user.email,
        picture: user.photoUrl,
        token: user.authToken
      }
      this.authService.socialLogin(data).subscribe(response => {
        if(response.success) {
           this.authService.saveAccessData(response.token, "", response.user);
           this.events.emitAuthEvent(true);
           $('#login-modal').modal('hide');
           this.router.navigateByUrl('/profile')
        }
        else {
         this.message = "Unable to login! Please try after sometimes" 
        }
      },
      err => {
        this.message = "Something wrong! Please try after sometimes"
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
            this.success = "SignIn Success!";
            setTimeout(() => { 
              this.authService.saveAccessData(data.token, "", data.user);
              this.events.emitAuthEvent(true);
              $('#login-modal').modal('hide');
              this.router.navigateByUrl('/profile');
            }, 2000);
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
