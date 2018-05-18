import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../authentication';
import { UserService } from '../../../../../services/user_service';
import { EventService } from '../../../../../services/event_service';
import { environment } from '../../../../../environments/environment';
import { Education } from '../../../../models/education';
import { Experience } from '../../../../models/experience';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
 
  user:any = {};
  error = "";
  info = "";
  uploading = false;
  education: Education;
  reset_edu: Education;
  experience: Experience;
  reset_exp: Experience;
  educations: Array<Education>;
  experiences: Array<Experience>
  env = {}
  months = ['January', 'February', 'March', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['2000','2001','2002','2003','2004','2005','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018']
  constructor(private authService: AuthenticationService,
  	private route: Router,
    private userService: UserService,
    private eventService: EventService) { 
    this.env = environment;
    if(this.authService.isAuthorized()) {
      this.authService.me().subscribe(response => {
        this.user = response;
        let name_devider = response.name.split(" ", 2);
        this.user.first_name = name_devider[0];
        this.user.last_name = name_devider[1];
        if(this.user.user_type == 'teacher') {
          this.loadExperiences();
        }
      },
      err => {
        this.error = "Something wrong! Please try after sometimes.";
      });
    }
    else {
      route.navigateByUrl('/');
    }
  }

  onFileChanged(event: any) {
    const formData = new FormData();
    var file = event.target.files[0];
    formData.append('avatar', file, file.name);
    this.uploading = true;
    this.userService.uploadAvatar(formData).subscribe(response => {
      this.user.avatar = response.avatar;
      this.uploading = false;
      this.authService.setAuthUser(this.user);
      this.eventService.emitAuthEvent(true);
    },
    err => {
      this.error = "Unable to upload profile image";
      this.uploading = false;
    });
  }

  public not_implemented() {
    this.info = "We are working on this feature!"
  }

  public update_profile() {
    this.userService.updateProfile(this.user).subscribe(response => {
      if(response.success) {
       this.info = response.message;
       this.authService.setAuthUser(this.user);
       this.eventService.emitAuthEvent(true);
       this.error = '';  
      }
      else {
        this.info = '';
        this.error = response.message;
      }
    },
    err => {
      this.error = "Something wrong! Please try after sometimes.";
      this.info = '';
    });
  }

  public initEducation(index = null) {
    if(index == null) {
      this.education = new Education();
    }
    else {
      this.education = this.educations[index];
      this.education.index = index;
    }
  }

  public addEducation() {
    this.userService.createEducation(this.education).subscribe(response => {
      if(response.success) {
        this.educations.push(response.education);
        this.education = this.reset_edu;
        this.updateStatus(true, "Education information updated");
      }
      else {
        this.updateStatus(false, response.message);
      }      
    },
    err => {
      this.error = "Unable to add education"
    });
  }

  public updateEducation() {
    this.userService.updateEducation(this.education).subscribe(response => {
      if(response.success) {
        this.educations[this.education.index] = response.education;
        this.education = this.reset_edu;
        this.updateStatus(true, "Education information updated");
      }
      else {
        this.updateStatus(false, response.message);
      } 
    },
    err => {
      this.updateStatus(false, "Unable to update education");
    })
  }

  public cancelEducation() {
    this.education = this.reset_edu;
  }

  //##################### EXPERIENCE SECTION ############################// 

  public initExperience(index = null) {
    if(index == null) {
      this.experience = new Experience();
    }
    else {
      this.experience = this.experiences[index];
      this.experience.index = index;
    }
  }

  public addExperience() {
    this.userService.createExperience(this.experience).subscribe(response => {
      if(response.success) {
        this.experiences.push(response.experience);
        this.experience = this.reset_exp;
        this.updateStatus(true, "Experience information added");
      }
      else {
        this.updateStatus(false, response.message);
      }   
    },
    err => {
      this.error = "Unable to add experience"
    });
  }

  public updateExperience() {
    this.userService.updateExperience(this.experience).subscribe(response => {
      if(response.success) {
        this.experiences[this.experience.index] = response.experience;
        this.experience = this.reset_exp;
        this.updateStatus(true, "Experience information updated");
      }
      else {
        this.updateStatus(false, response.message);
      }  
    },
    err => {
      this.updateStatus(false, "Unable to update experience");
    })
  }

  public cancelExperience() {
    this.experience = this.reset_exp;
  }

  //##################### END EXPERIENCE SECTION ############################// 

  ngOnInit() {
    this.loadEducation();
  }

  public updateStatus(state, msg) {
    if(state) {
      this.info = msg;
      this.error = "";
    }
    else {
      this.info = "";
      this.error = msg;
    }
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
 
  public hideNotification() {
    this.error = '';
    this.info = '';
  }
}
