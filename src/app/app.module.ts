import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

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
import { EventService} from '../services/event_service';
import { UserService} from '../services/user_service';
import { HelperService} from '../services/helper_service';
import { CourseService} from '../services/course_service';
import { AssesmentService} from '../services/assesment_service';
import { CategoryService } from '../services/category_service';
import { LogoutComponent } from './logout/logout.component';
import { SubnavComponent } from './users/student/subnav/subnav.component';
import { StudentHomeComponent } from './users/student/home/home.component';
import { StudentSettingsComponent } from './users/student/student-settings/student-settings.component';
import { ReportComponent } from './users/student/report/report.component';
import { PurchaseHistoryComponent } from './users/student/purchase-history/purchase-history.component';
import { PurchaseReportComponent } from './users/student/purchase-report/purchase-report.component';
import { InstructorDashboardComponent } from './users/instructor/dashboard/dashboard.component';
import { EditCourseComponent } from './users/instructor/dashboard/courses/edit/edit-course.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";
import { TeacherProfileComponent } from './users/profile/teacher/teacher.component';
import { InstructorCoursesComponent } from './users/instructor/dashboard/courses/courses.component';
import { InstructorSidenavComponent } from './users/instructor/sidenav/sidenav.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CurriculumComponent } from './users/instructor/dashboard/courses/edit/curriculum/curriculum.component';
import { CategoryCoursesComponent } from './category/courses/courses.component';
import { SearchComponent } from './search/search.component';
import { LoaderComponent } from './loader/loader.component';
import { LectureComponent } from './courses/course-details/lecture/lecture.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("620483118272-k5rlaq5b5ae80d3jqqfr525kn338lsm3.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1399450506848052")
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
    InstructorDashboardComponent,
    EditCourseComponent,
    TeacherProfileComponent,
    InstructorCoursesComponent,
    InstructorSidenavComponent,
    CoursesComponent,
    CourseDetailsComponent,
    CurriculumComponent,
    CategoryCoursesComponent,
    SearchComponent,
    LoaderComponent,
    LectureComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule,
    SocialLoginModule //.initialize(config)
  ],
  providers: [AuthenticationService, TokenStorage, HttpClient, EventService, UserService, CourseService, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, HelperService, CategoryService, AssesmentService],
  bootstrap: [AppComponent],
  entryComponents: [LoaderComponent]
})
export class AppModule { }