import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Notification} from '../../services/notification';
import {CourseService} from '../../services/course_service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term = '';
  courses = [];
  constructor(private route: ActivatedRoute, private courseService: CourseService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
  	this.route.queryParams.forEach(params => {
        this.term =  params['q'];
        this.searchResult();
    });
  }

  searchResult() {
    this.courseService.search(this.term).subscribe(response => {
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

  public thumb(image) {
    if(image) {
      let img = "url(" + environment.assets_host + image + ")";
      return  this.domSanitizer.bypassSecurityTrustStyle(img);
    }
    else {
      return  this.domSanitizer.bypassSecurityTrustStyle("url(/assets/images/courses/science2.png)");
    }
  }

}
