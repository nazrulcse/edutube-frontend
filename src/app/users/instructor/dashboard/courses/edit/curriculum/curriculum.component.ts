import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../../../../services/user_service';
import { EventService } from '../../../../../../../services/event_service';
import { Lecture } from '../../../../../../models/lecture';
import { environment } from '../../../../../../../environments/environment';

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
  constructor() { }

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
    console.log(this.lectures);
  }

  public loadCourseCurriculum(course_id) {
     this.lecture = new Lecture();
  }

}
