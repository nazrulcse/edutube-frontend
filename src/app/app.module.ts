import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { Routing } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EditComponent } from './users/profile/edit/edit.component';
import { StudentComponent } from './users/profile/edit/student/student.component';
import { AuthenticationService, TokenStorage } from './authentication';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {EventService} from '../services/event_service';
import {UserService} from '../services/user_service';
import { LogoutComponent } from './logout/logout.component';
import { SubnavComponent } from './users/student/subnav/subnav.component';
import { StudentHomeComponent } from './users/student/home/home.component';
import { StudentSettingsComponent } from './users/student/student-settings/student-settings.component';
import { ReportComponent } from './users/student/report/report.component';
import { PurchaseHistoryComponent } from './users/student/purchase-history/purchase-history.component';
import { PurchaseReportComponent } from './users/student/purchase-report/purchase-report.component';
import { NewCourseComponent } from './instructor/new-course/new-course.component';
import { EditCourseComponent } from './instructor/edit-course/edit-course.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("620483118272-k5rlaq5b5ae80d3jqqfr525kn338lsm3.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    EditComponent,
    StudentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LogoutComponent,
    StudentHomeComponent,
    SubnavComponent,
    StudentSettingsComponent,
    ReportComponent,
    PurchaseHistoryComponent,
    PurchaseReportComponent,
    NewCourseComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpClientModule,
    FormsModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [AuthenticationService, TokenStorage, HttpClient, EventService, UserService, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }