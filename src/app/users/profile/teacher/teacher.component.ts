import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Education } from '../../../models/education';
import { Course } from '../../../models/course';
import { Experience } from '../../../models/experience';
import { UserService } from '../../../../services/user_service';
import { EventService } from '../../../../services/event_service';
import { environment } from '../../../../environments/environment';
import { Notification } from '../../../../services/notification';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  @Input() user;
  educations: Array<Education>;
  experiences: Array<Experience>;
  courses: Array<Course>;
  env: any;
  error = '';
  xyz: Course;
  constructor(private userService: UserService, private domSanitizer: DomSanitizer) { 
    this.env = environment;
    this.xyz = new Course();
  }

  ngOnInit() {
  	this.loadEducation();
  	this.loadExperiences();
    this.loadCourses();
  }

  public loadEducation() {
    this.userService.getEducations().subscribe(response => {
      if(response.success) {
        this.educations = response.educations;
      }
      else {
        Notification.show('error', 'Unable to load education data!');
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  public loadExperiences() {
    this.userService.getExperiences().subscribe(response => {
      if(response.success) {
        this.experiences = response.experiences;
      }
      else {
        Notification.show('error', 'Unable to load experience data!');
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  public loadCourses() {
    this.userService.getCourses().subscribe(response => {
      if(response.success) {
         this.courses = response.courses;
      }
      else {
        Notification.show('error', 'Unable to load courses data!');
      }
    },
    error => {
      Notification.show('error', 'Unable to load some profile data!');
    })
  }

  public thumb(image) {
    if(image) {
      let img = "url(" + this.env.assets_host + image + ")";
      return  this.domSanitizer.bypassSecurityTrustStyle(img);
    }
    else {
      return  this.domSanitizer.bypassSecurityTrustStyle("url(/assets/images/courses/science2.png)");
    }
  }

}
