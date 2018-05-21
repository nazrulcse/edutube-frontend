import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { CourseService } from "../../../../../../services/course_service";
import { Course } from "../../../../../models/course";
import { CourseGoal } from "../../../../../models/course_goal";
import { environment } from '../../../../../../environments/environment';
import { Notification } from '../../../../../../services/notification';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  course: Course;
  error = '';
  message = '';
  display_discount = false;
  uploading_image = false;
  uploading_video = false;
  course_id = '';
  klass = '';
  env: any;
  klasses = [];
  subjects = [];
  tools_requires = [];
  who_can_takes = [];
  achivements = [];
  category_result = '';
  category_search_results = [];
  course_categories = [];
  categories = [];
  input_category = '';

  constructor(private courseService: CourseService,
  	private route:ActivatedRoute) { 
  	this.course = new Course();
    this.env = environment;
  }

  ngOnInit() {
  	this.course_id =  this.route.snapshot.params['id'];
  	this.loadCourse(this.course_id);
    this.editCourse();
  }

  public submitCourseUpdate() {
    this.courseService.updateCourse(this.course).subscribe(response => {
      if(response.success) {
        Notification.show('success', response.message);
      }
      else {
       Notification.show('success', response.message);
      }
    },
    err => {
      Notification.show('error', 'Something wrong! Please try after sometimes');
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
      Notification.show('error', "Unable to upload course " + type);
      this.uploading_image = false;
      this.uploading_video = false;
    });
  }

  public addMoreGoal(type) {
    if(type == 'tools') {
      this.tools_requires.push(new CourseGoal());
    }
    else if(type=="who") {
      this.who_can_takes.push(new CourseGoal());
    }
    else {
      this.achivements.push(new CourseGoal());
    }
  }

  public submitCourseGoals() {
    this.course.tools_required = JSON.stringify(this.filterGoal(this.tools_requires));
    this.course.who_can_take = JSON.stringify(this.filterGoal(this.who_can_takes));
    this.course.achivement = JSON.stringify(this.filterGoal(this.achivements));
    this.submitCourseUpdate();
  }

  public submitCourseCurriculum() {

  }

  public submitCourseCaptions() {
    
  }

  //################################## COURSE CATEGORY SECTION ######################################

  public categorySelect(event) {
    let value = event.target.value;
    this.category_search_results = this.categories.filter(cat => cat.title.toLowerCase().includes(value.toLowerCase()));
    if(value != '' && value.length > 1 && this.category_search_results.length > 0) {
      this.category_result = 'show';  
    }
    else {
      this.category_result = '';
    }
  }

  public hideCategorySelection(event) {
    //this.category_result = '';
    //event.target.value = '';
  }

  public editCourse() {
    this.courseService.editCourse(this.course_id).subscribe(response => {
      this.categories = response.categories;
      this.course_categories = response.course_categories;
      this.klasses = response.klasses;
      this.subjects = response.subjects;
    });
  }

  public addCategoryToCourse(category) {
    this.courseService.addCategory(this.course_id, category.id).subscribe(response => {
      if(response.success) {
        this.course_categories.push(category);
        this.category_result = ''; 
        this.input_category = '';
        Notification.show('success', "Category has been added to course");
      }
      else {
        Notification.show('warning', response.message);
      }
    },
    err => {
       Notification.show('error');
    });
  }

  public removeCategory(category, index) {
    this.courseService.removeCategory(this.course_id, category.id).subscribe(response => {
      if(response.success) {
        this.course_categories.splice(index, 1);
        Notification.show('success', "Category deleted from course");
      }
      else {
        Notification.show('error', "Unable to remove category");
      }
    },
    err => {
       Notification.show('error');
    });
  }

  //################################## END COURSE CATEGORY SECTION ####################################

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
        this.setCourseGoal(this.course);
      }
      else {
        Notification.show('error', "Unable to load course");
      }
    },
    err => {
        Notification.show('error');
    });
  }

  public setCourseGoal(course) {
    if(course.tools_required) {
      this.tools_requires = JSON.parse(course.tools_required);
    }
    else {
      this.tools_requires.push(new CourseGoal());
    }

    if(course.who_can_take) {
      this.who_can_takes = JSON.parse(course.who_can_take);
    }
    else {
      this.who_can_takes.push(new CourseGoal());
    }

    if(course.achivement) {
      this.achivements = JSON.parse(course.achivement);
    }
    else {
      this.achivements.push(new CourseGoal());
    } 
  }

  public filterGoal(data) {
    var newArray = data.filter(value => value.name !== "");
    return newArray.length > 0 ? newArray : Array(new CourseGoal());
  }
}
