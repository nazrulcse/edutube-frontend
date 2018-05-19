import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category_service';
import { HelperService } from '../../../services/helper_service';
import { environment } from '../../../environments/environment';
import { Category } from '../../models/category';
import { Course } from '../../models/course';

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
  constructor(private categoryService: CategoryService,
  	private route: ActivatedRoute, 
  	private  helperService: HelperService) {
    this.env = environment;
    this.category = new Category();
  }

  ngOnInit() {
  	let cat_id =  this.route.snapshot.params['slug'];
  	this.loadAllCategory();
  	this.loadCategory(cat_id);
  }

  loadCategory(id) {
    this.categoryService.getCategory(id).subscribe(response => {
      if(response.success) {
        this.category = response.category;
        this.courses = response.courses;
      }
      else {
      	this.error = response.message;
      }
    },
    err => {
      this.error = "Unable to load category";
    });
  }

  loadAllCategory() {
  	this.helperService.getCategories().subscribe(response => {
      if(response.success) {
        this.header_categories = response.categories;
      }
    });
  }

}
