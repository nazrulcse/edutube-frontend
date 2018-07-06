import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../../../../services/user_service';
import { EventService } from '../../../../../../../services/event_service';
import { Lecture } from '../../../../../../models/lecture';
import { Assesment } from '../../../../../../models/assesment';
import { environment } from '../../../../../../../environments/environment';
import { CourseService } from "../../../../../../../services/course_service";
import { Notification } from '../../../../../../../services/notification';
declare var $;

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  @Input() course;
  @Input() course_id;
  lectures: Array<Lecture>;
  draft_lecture: Lecture;
  reset_lecture: Lecture;
  assesment: Assesment;
  selected_file: any;
  constructor(private courseService: CourseService) { 
    this.lectures = [];
  }

  ngOnInit() {
    console.log(this.course);
  	this.loadCourseCurriculum(this.course_id);
    this.assesment = new Assesment();
  }

  public addLecture(index = '') {
    if(!this.draft_lecture || !this.draft_lecture.is_draft) {
      this.draft_lecture = new Lecture();
      this.draft_lecture.is_draft = true;
      this.lectures.push(this.draft_lecture);
    }
  }

  public loadCourseCurriculum(course_id) {
    this.courseService.getLectures(course_id).subscribe(response => {
      if(response.success) {
        this.lectures = response.lectures;
      }
      else {
        Notification.show('error', response.error);
      }
    },
    err => {
      Notification.show('error', "Unable to load lecture");
    })
  }

  public loadAssesment(lecture_id) {
    this.assesment = new Assesment();
    console.log(this.assesment);
  }

  public onFileChanged($event, lecture) {
    var file = $event.target.files[0];
    this.selected_file = file;
  }

  public updateLecture(lecture, index, is_valid) {
    if(is_valid) {
      const lectureForm = new FormData();
      for ( var key in lecture) {
        lectureForm.append(key, lecture[key]);
      }
      if(this.selected_file) {
        lectureForm.append('file', this.selected_file, this.selected_file.name);
        this.selected_file = null;
      }
      this.courseService.updateLecture(this.course.id, lectureForm).subscribe(response => {
        if(response.success) {
          Notification.show('success', "Lecture saved!");
          if(lecture.is_draft) {
            this.draft_lecture = this.reset_lecture;
          }
          this.lectures[index] = response.lecture
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
