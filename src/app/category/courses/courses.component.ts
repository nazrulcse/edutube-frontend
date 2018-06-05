import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category_service';
import { HelperService } from '../../../services/helper_service';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { Course } from '../../models/course';
import {CourseService} from '../../../services/course_service';
import {Notification} from '../../../services/notification';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CategoryCoursesComponent implements OnInit {

  category: Category;
  courses: Array<Course>;
  error = '';
  header_categories = [];
  env: any;
  search_params = {price_filter: '', subject: '', class_name: '', category_id: ''};
  constructor(private categoryService: CategoryService,
  	private route: ActivatedRoute, 
  	private  helperService: HelperService, private courseService: CourseService) {
    this.env = environment;
    this.category = new Category();
  }

  ngOnInit() {
  	this.loadAllCategory();
  	this.route.params.forEach(params => {
        let cat_id =  this.route.snapshot.params['slug'];
        this.loadCategory(cat_id);
    });
  }

  loadCategory(id) {
    this.categoryService.getCategory(id).subscribe(response => {
      if(response.success) {
        this.category = response.category;
        this.search_params.category_id = this.category.id.toString();
        this.courses = response.courses;
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error', 'Unable to load category');
    });
  }

  loadAllCategory() {
  	this.helperService.getCategories().subscribe(response => {
      if(response.success) {
        this.header_categories = response.categories;
      }
    });
  }

  public searchFilter() {
   this.courseService.search(this.search_params).subscribe(response => {
      if(response.success) {
        this.courses = response.courses;
      }
      else {
        Notification.show('error', 'Unable to complete search');
      }
    },
    error => {
      Notification.show('error');
    });
  }

}
