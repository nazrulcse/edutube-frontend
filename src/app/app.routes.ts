// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './users/profile/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './users/profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { StudentHomeComponent } from './users/student/home/home.component';
import { StudentSettingsComponent } from './users/student/student-settings/student-settings.component';
import { ReportComponent } from './users/student/report/report.component';
import { PurchaseHistoryComponent } from './users/student/purchase-history/purchase-history.component';
import { PurchaseReportComponent } from './users/student/purchase-report/purchase-report.component';
import { InstructorDashboardComponent } from './users/instructor/dashboard/dashboard.component';
import { EditCourseComponent } from './users/instructor/dashboard/courses/edit/edit-course.component';
import { InstructorCoursesComponent } from './users/instructor/dashboard/courses/courses.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CategoryCoursesComponent } from './category/courses/courses.component';
import { SearchComponent } from './search/search.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'profile/edit', component: EditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'c/:category/courses/:id', component: CourseDetailsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'instructor/dashboard', component: InstructorDashboardComponent },
  { path: 'instructor/dashboard/courses', component: InstructorCoursesComponent },
  { path: 'instructor/dashboard/courses/:id/edit', component: EditCourseComponent },
  { path: 'c/:slug', component: CategoryCoursesComponent },
  { 
  	 path: 'home', 
     component: StudentHomeComponent,
     children: [
       {
       	 path: 'settings',
         component: StudentSettingsComponent,
         outlet: 'student'
       },
       {
       	 path: 'reports',
         component: ReportComponent,
         outlet: 'student'
       },
       {
       	 path: 'purchase-history',
         component: PurchaseHistoryComponent,
         outlet: 'student'
       },
       {
       	 path: 'purchase-receipt',
         component: PurchaseReportComponent,
         outlet: 'student'
       }
     ]
  }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);