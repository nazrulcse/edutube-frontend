import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category_service';
import { CourseService } from '../../../services/course_service';
import { HelperService } from '../../../services/helper_service';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { Course } from '../../models/course';
import { User } from '../../models/user';
import { Lecture } from '../../models/lecture';
import {Notification} from '../../../services/notification';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  error = '';
  env: any;
  course: Course;
  related_course: Array<Course>;
  course_goal = {
  	who_can_take: [],
  	requirements: [],
  	what_to_learn: []
  };
  author: User;
  category: Category;
  lectures: Array<Lecture>;
  constructor(private categoryService: CategoryService,
  	private route: ActivatedRoute, 
  	private  helperService: HelperService,
  	private  courseService: CourseService,
    private domSanitizer: DomSanitizer) { 
    this.env = environment;
    this.course = new Course();
    this.author = new User();
    this.category = new Category();
  }

  ngOnInit() {
    let course_id =  this.route.snapshot.params['id'];
    let category =  this.route.snapshot.params['category'];
    this.loadCourseDetails(course_id, category);
  }

  loadCourseDetails(id, category) {
    this.courseService.getCourseDetails(id, category).subscribe(response => {
      if(response.success) {
        this.course = response.course;
        this.author = response.user;
        this.setCourseGoal(this.course);
        if(response.category) {
          this.category = response.category;
        }
        this.lectures = response.lectures;
        this.getRelatedCourse(this.course.id);
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error', 'Unable to load course data');
    });
  }

  setCourseGoal(course) {
    if(course.tools_required) {
      this.course_goal.requirements = JSON.parse(course.tools_required);
    }

    if(course.who_can_take) {
      this.course_goal.who_can_take = JSON.parse(course.who_can_take);
    }

    if(course.achivement) {
      this.course_goal.what_to_learn = JSON.parse(course.achivement);
    } 
  }

  public getRelatedCourse(course_id) {
    this.courseService.getRelatedCourse(course_id).subscribe(response => {
      if(response.success) {
        this.related_course = response.related_course;
      }
      else {
        Notification.show('error', 'Unable to load related course');
      }
    },
    err => {
      Notification.show('error', 'Unable to load related course');
    });
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
