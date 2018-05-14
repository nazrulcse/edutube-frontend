import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from "../../../../services/course_service";
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
        this.notification(false, "Unable to create course!");
      }
    },
    err => {
        this.notification(false, "Something wrong! Please try after sometimes");
    });
  }

  public notification(status, msg) {
    this.error = msg;
  }

}
