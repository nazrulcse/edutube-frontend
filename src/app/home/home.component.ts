import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course_service';
import { environment } from '../../environments/environment';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = [1,2,3,4,5,6];
  top_courses = {top_views: [], top_shareds: [], latest_uploads: []}
  env: any;
  constructor(private courseService: CourseService) {
    this.env = environment;
  }

  ngOnInit() {
  	this.loadTopCourse();
  }

  public loadTopCourse() {
    this.courseService.getTopCourses().subscribe(response => {
      if(response.success) {
        this.top_courses.top_shareds = response.top_shared;
        this.top_courses.top_views = response.top_view;
        this.top_courses.latest_uploads = response.latest_upload;
        this.activeSlider();
      }
    },
    err => {
      
    })
  }

  public activeSlider() {
    setTimeout(() => {
      $('#latest-uploads, #top-shared, #top-viewed').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1
            }
          },
        ]
      });
    }, 100); 
  }

}
