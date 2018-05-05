import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { AuthenticationModule } from './authentication';

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
    StudentComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
