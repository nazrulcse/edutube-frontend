import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseService } from "../../../../../../services/course_service";
import { Course } from "../../../../../models/course";
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  course: Course;
  error = '';
  display_discount = false;
  uploading_image = false;
  uploading_video = false;
  course_id = '';
  env: any;
  constructor(private courseService: CourseService,
  	private route:ActivatedRoute) { 
  	this.course = new Course();
    this.env = environment;
  }

  ngOnInit() {
  	this.course_id =  this.route.snapshot.params['id'];
  	this.loadCourse(this.course_id);
  }

  public submitCourseUpdate() {
    this.courseService.updateCourse(this.course).subscribe(response => {
      if(response.success) {
        this.notification(true, response.message);
      }
      else {
        this.notification(false, response.message);
      }
    },
    err => {
      this.notification(false, 'Something wrong! Please try after sometimes');
    })
  }

  public onFileChanged($event, type) {
    const formData = new FormData();
    var file = $event.target.files[0];
    formData.append('file', file, file.name);
    formData.append('upload_type', type);
    if(type == 'image') {
      this.uploading_image = true;
    }
    else {
      this.uploading_video = true;
    }
    this.courseService.uploadFile(this.course_id, formData).subscribe(response => {
      if(type == 'image') {
        this.course.image = response.file;
        this.uploading_image = false;
      }
      else {
        this.course.promo_video = response.file;
        this.uploading_video = false;
      }
    },
    err => {
      this.error = "Unable to upload course " + type;
      this.uploading_image = false;
      this.uploading_video = false;
    });
  }

  public submitCourseDetails() {

  }

  public submitCourseCurriculum() {

  }

  public submitCourseCaptions() {
    
  }

  public addDiscountPrice() {
    this.display_discount = true;
  }

  public showDiscount() {
    return (this.course.discount_price > 0 || this.display_discount);
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
