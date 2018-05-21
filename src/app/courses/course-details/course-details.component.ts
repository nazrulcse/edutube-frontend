import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category_service';
import { CourseService } from '../../../services/course_service';
import { HelperService } from '../../../services/helper_service';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { Course } from '../../models/course';
import { User } from '../../models/user';
import {Notification} from '../../../services/notification';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  error = '';
  course: Course;
  course_goal = {
  	who_can_take: [],
  	requirements: [],
  	what_to_learn: []
  };
  author: User;
  category: Category;
  constructor(private categoryService: CategoryService,
  	private route: ActivatedRoute, 
  	private  helperService: HelperService,
  	private  courseService: CourseService) { 
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

}
