import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../authentication';
import { UserService } from '../../../../../services/user_service';
import { EventService } from '../../../../../services/event_service';
import { environment } from '../../../../../environments/environment';
import { Education } from '../../../../models/education';
import { Experience } from '../../../../models/experience';
import { Country } from '../../../../models/country';
import { Language } from '../../../../models/language';
import { User } from '../../../../models/user';
import { BankAccount } from '../../../../models/bank_account';
import { Notification } from '../../../../../services/notification';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  user: User;
  error = "";
  info = "";
  ins_result = '';
  uploading = false;
  bank_account: BankAccount;
  education: Education;
  reset_edu: Education;
  experience: Experience;
  reset_exp: Experience;
  educations: Array<Education>;
  experiences: Array<Experience>;
  languages: Array<Language>;
  language: Language;
  reset_lang: Language;
  institutions = [];
  ins_search_results = [];
  language_list = ['Bangla', 'English', 'Arabic', 'Urdu', 'Hindi', 'Korean', 'Chinese', 'Other']
  designations = ['Teacher', 'Teacher Aide', 'Assistant Teacher', 'Tutor', 'Principal', 'Head Mistress', 'Lecturer', 'Professor', 'Assistant Professor']
  country_list = Country.list();
  env = {}
  months = ['January', 'February', 'March', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['2000','2001','2002','2003','2004','2005','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018']
  list_degree = [
    'JSC/JDC', 'Secondary', 'Higher Secondary', 'Diploma', 'Bachelor/Honors', 'Masters', 'PhD'
  ]
  constructor(private authService: AuthenticationService,
  	private route: Router,
    private userService: UserService,
    private eventService: EventService) {
    this.env = environment;
    this.user = new User();
    this.bank_account = new BankAccount();
    if(this.authService.isAuthorized()) {
      this.authService.me().subscribe(response => {
        this.user = response;
        if(this.user.user_type == 'teacher') {
          this.loadExperiences();
          this.loadBankAccount();
        }
      },
      err => {
        Notification.show('error');
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
      Notification.show('error', "Unable to upload profile image");
      this.uploading = false;
    });
  }

  public not_implemented() {
    Notification.show('warning', "We are working on this feature!");
  }

  public update_profile() {
    this.userService.updateProfile(this.user).subscribe(response => {
      if(response.success) {
        this.authService.setAuthUser(this.user);
        this.eventService.emitAuthEvent(true);
        Notification.show('success', response.message);
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
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
        Notification.show('success', "Education information updated");
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
    });
  }

  public updateEducation() {
    this.userService.updateEducation(this.education).subscribe(response => {
      if(response.success) {
        this.educations[this.education.index] = response.education;
        this.education = this.reset_edu;
        Notification.show('success', "Education information updated");
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
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
        Notification.show('success', "Experience information added");
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
    });
  }

  public updateExperience() {
    this.userService.updateExperience(this.experience).subscribe(response => {
      if(response.success) {
        this.experiences[this.experience.index] = response.experience;
        this.experience = this.reset_exp;
        Notification.show('success', "Experience information updated");
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
    })
  }

  public cancelExperience() {
    this.experience = this.reset_exp;
  }

  //##################### END EXPERIENCE SECTION ############################//

  public initLanguage(index = null) {
    if(index == null) {
      this.language = new Language();
    }
    else {
      this.language = this.languages[index];
      this.language.index = index;
    }
  }

  public addLanguage() {
    this.userService.createLanguage(this.language).subscribe(response => {
      if(response.success) {
        this.languages.push(response.language);
        this.language = this.reset_lang;
        Notification.show('success', "Added new language");
      }
      else {
        Notification.show('error', response.message);
      }      
    },
    err => {
      Notification.show('error');
    });
  }

  public updateLanguage() {
    this.userService.updateLanguage(this.language).subscribe(response => {
      if(response.success) {
        this.languages[this.language.index] = response.language;
        this.language = this.reset_lang;
        Notification.show('success', "language information updated");
      }
      else {
        Notification.show('error', response.message);
      } 
    },
    err => {
      Notification.show('error');
    })
  }

  public cancelLanguage() {
    this.language = this.reset_lang;
  }

  /////////////////////////////// END Language section ////////////////////////

  ngOnInit() {
    this.loadEducation();
    this.loadLanguages();
  }

  public loadEducation() {
    this.userService.getEducations().subscribe(response => {
      if(response.success) {
        this.educations = response.educations;
        this.institutions = response.institutions;
      }
      else {
        Notification.show('error', 'Unable to load education data!');
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  public loadExperiences() {
    this.userService.getExperiences().subscribe(response => {
      if(response.success) {
        this.experiences = response.experiences;
      }
      else {
        Notification.show('error', 'Unable to load experience data!');
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  public loadLanguages() {
    this.userService.getLanguages().subscribe(response => {
      if(response.success) {
        this.languages = response.languages;
      }
      else {
        Notification.show('error', 'Unable to load language data!');  
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  //################ INSTITUTION SELECTION ######################

  public insSelect(event) {
    let value = event.target.value;
    this.ins_search_results = this.institutions.filter(ins => ins.institution.toLowerCase().includes(value.toLowerCase()));
    if(value != '' && value.length > 1 && this.ins_search_results.length > 0) {
      this.ins_result = 'show';
    }
    else {
      this.ins_result = '';
    }
  }

  public appendIns(model, ins) {
    model.institution = ins.institution;
    this.ins_result = '';
  }

  public hideInsSelection(event) {
    setTimeout(()=>{
      this.ins_result = '';
    }, 100);
  }

  public loadBankAccount() {
    this.userService.getBankAccount().subscribe(response => {
        if(response.success) {
          this.bank_account = response.bank_account ? response.bank_account : (new BankAccount);
        }
        else {
          Notification.show('error', 'Unable to load bank account data!');
        }
      },
      err => {
        Notification.show('error', 'Unable to load some profile data!');
      });
  }

  public updateBankAccount() {
    console.log(this.bank_account);
    this.userService.updateBankAccount(this.bank_account).subscribe(response => {
      if(response.success) {
            Notification.show('success', "Bank account updated successfully!");
          }
          else {
            Notification.show('error', response.message);
          }
       },
      err => {
         Notification.show('error', 'Unable to load some profile data!');
      });
  }
}
