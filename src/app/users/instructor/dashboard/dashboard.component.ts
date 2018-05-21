import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../../../services/course_service";
import { Notification } from "../../../../services/notification";
import { Course } from "../../../models/course";

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {

  course: Course;
  error = '';
  constructor(private courseService: CourseService,
  	private route: Router) { 
    this.course = new Course();
  }

  ngOnInit() {
  }

  public courseSubmit() {
    this.courseService.createCourse(this.course).subscribe(response => {
      if(response.success) {
        this.route.navigateByUrl('/instructor/dashboard/courses');
      }
      else {
        Notification.show('error', "Unable to create course!");
      }
    },
    err => {
        Notification.show('error', "Something wrong! Please try after sometimes");
    });
  }
}
