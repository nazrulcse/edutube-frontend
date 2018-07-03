import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../../../../services/user_service';
import { EventService } from '../../../../../../../services/event_service';
import { Lecture } from '../../../../../../models/lecture';
import { environment } from '../../../../../../../environments/environment';
import { CourseService } from "../../../../../../../services/course_service";
import { Notification } from '../../../../../../../services/notification';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  @Input() course;
  lectures: Array<Lecture>;
  lecture: Lecture;
  reset_lecture: Lecture;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
  	this.loadCourseCurriculum(this.course.id);
  }

  public addLecture(index = '') {
    if(index) {
      this.lecture = this.lectures[index];
    }
    else {
    	this.lecture = new Lecture();
    	this.lectures = [this.lecture];
    }
  }

  public loadCourseCurriculum(course_id) {
    this.courseService.getLectures(course_id).subscribe(response => {
      if(response.success) {
        this.lectures = response.lecture;
      }
      else {
        Notification.show('error', response.error);
      }
    },
    err => {
      Notification.show('error', "Unable to load lecture");
    })
     this.lecture = new Lecture();
  }

  public updateLecture(lecture, is_valid) {
    if(is_valid) {
      this.courseService.updateLecture(this.course.id, lecture).subscribe(response => {
        if(response.success) {
          
        }
        else {
          Notification.show('error', response.error);
        }
      },
      err => {
        Notification.show('error', "Unable to update lecture");
      })
    }
    else {
       Notification.show('warning', "Please fill the required field!");
    }
  }

}
