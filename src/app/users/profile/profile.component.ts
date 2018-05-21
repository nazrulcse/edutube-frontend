import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication';
import { environment } from '../../../environments/environment';
import { UserService } from '../../../services/user_service';
import { Notification } from '../../../services/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:any = {};
  error = "";
  info = "";
  env = {}
  educations: any;
  constructor(private authService: AuthenticationService,
  	private route: Router,
    private userService: UserService) { 
    this.env = environment;
    if(this.authService.isAuthorized()) {
      this.authService.me().subscribe(response => {
        this.user = response;
        let name_devider = response.name.split(" ", 2);
        this.user.first_name = name_devider[0];
        this.user.last_name = name_devider[1];
      },
      err => {
        Notification.show('error');
      });
    }
    else {
      Notification.show('error', 'You are not authorized for this page!');
      route.navigateByUrl('/');
    }
  }

  public loadEducation() {
    this.userService.getEducations().subscribe(response => {
      if(response.success) {
        this.educations = response.educations;
      }
      else {
        Notification.show('error', 'Unable to load education data!');
      }
    },
    err => {
      Notification.show('error', 'Unable to load some profile data!');
    });
  }

  ngOnInit() {
    this.loadEducation();
  }

}
