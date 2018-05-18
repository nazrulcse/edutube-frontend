import { Component, OnInit } from '@angular/core';
import { CourseService } from "../../../../../services/course_service";
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
