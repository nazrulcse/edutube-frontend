import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseService } from "../../../../../../services/course_service";
import { Course } from "../../../../../models/course";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  course: Course;
  error = '';
  constructor(private courseService: CourseService,
  	private route:ActivatedRoute) { 
  	this.course = new Course();
  }

  ngOnInit() {
  	let course_id =  this.route.snapshot.params['id'];
  	this.loadCourse(course_id);
  }

  public submitCourseGoal() {

  }

  public submitCoursePrice() {

  }

  public submitCourseDetails() {

  }

  public submitCourseCurriculum() {

  }

  public submitCourseCaptions() {
    
  }

  public loadCourse(id) {
  	this.courseService.getCourse(id).subscribe(response => {
      if(response.success) {
        this.course = response.course;
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
