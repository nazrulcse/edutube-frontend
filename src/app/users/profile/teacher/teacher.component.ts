import { Component, OnInit, Input } from '@angular/core';
import { Education } from '../../../models/education';
import { Experience } from '../../../models/experience';
import { UserService } from '../../../../services/user_service';
import { EventService } from '../../../../services/event_service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  @Input() user;
  educations: Array<Education>;
  experiences: Array<Experience>;
  env: any;
  error = '';
  constructor(private userService: UserService) { 
    this.env = environment;
  }

  ngOnInit() {
  	this.loadEducation();
  	this.loadExperiences();
  }

  public loadEducation() {
    this.userService.getEducations().subscribe(response => {
      this.educations = response.educations;
    },
    err => {
      this.error = "Unable to load some profile data!";
    });
  }

  public loadExperiences() {
    this.userService.getExperiences().subscribe(response => {
      this.experiences = response.experiences;
    },
    err => {
      this.error = "Unable to load some profile data!";
    });
  }

}
