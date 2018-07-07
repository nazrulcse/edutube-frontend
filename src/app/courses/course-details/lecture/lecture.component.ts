import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { Course } from '../../../models/course';
import { Lecture } from '../../../models/lecture';
import { CourseService } from '../../../../services/course_service';
import {Notification} from '../../../../services/notification';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {

  course: Course;
  lecture: Lecture;
  env: any;
  constructor(private  courseService: CourseService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.env = environment
  }

  ngOnInit() {
  	this.course = new Course();
  	let course_id =  this.route.snapshot.params['course_id'];
  	let id =  this.route.snapshot.params['id'];
  	this.loadCourseDetails(course_id, '');
  	this.loadLecture(course_id, id);
  }

  loadCourseDetails(id, category) {
    this.courseService.getCourseDetails(id, category).subscribe(response => {
      if(response.success) {
        this.course = response.course;
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error', 'Unable to load course data');
    });
  }

  loadLecture(course_id, id) {
    this.courseService.getLecture(course_id, id).subscribe(response => {
      if(response.success) {
        this.lecture = response.lecture;
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error', 'Unable to load course data');
    });
  }

  getContent(url) {
  	var youtube = url.search(/youtube.com/i);
    if(youtube > 0) {
      let html = "<div> <iframe width='100%' height='480' src='" + url + "' frameborder='0'></iframe> </div>";
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(url)[1];

    if(ext && (ext == 'pdf' || ext == 'doc' || ext == 'docx')) {
      let html = "<iframe width='100%' height='480' border='none' src='" + this.env.assets_host + url + "'></iframe>";
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    if(ext && (ext == 'png' || ext == 'gif' || ext == 'jpg' || ext == 'jpeg')) {
      return "<img src='" + this.env.assets_host + url + "' alt='content'/>";
    }

    let html = "<video id='player' playsinline controls width='100%'> <source src='" + this.env.assets_host + url + "' type='video/mp4'> <source src='" + this.env.assets_host + url + "' type='video/webm'> </video>";
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
