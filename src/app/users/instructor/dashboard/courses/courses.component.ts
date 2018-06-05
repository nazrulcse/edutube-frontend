import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../../../../services/course_service";
import { Notification } from "../../../../../services/notification";
import { Course } from "../../../../models/course";
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

  courses: Array<Course>;
  error: '';
  env: any;
  constructor(private courseService: CourseService) {
    this.loadCourse();
    this.env = environment;
  }

  ngOnInit() {

  }

  public loadCourse() {
  	this.courseService.getCourses().subscribe(response => {
      if(response.success) {
        this.courses = response.courses;
      }
      else {
        Notification.show('error', "Unable to create course!");
      }
    },
    err => {
        Notification.show('error', "Something wrong! Please try after sometimes");
    });
  }

  public featureNotIncluded() {
    Notification.show('warning', "This feature not included in this pahse");
  }
}
