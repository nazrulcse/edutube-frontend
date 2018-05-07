import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../authentication';
import { UserService } from '../../../../../services/user_service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
 
  user = {first_name: '', last_name: ''};
  error = "";
  info = "";
  constructor(private authService: AuthenticationService,
  	private route: Router,
    private userService: UserService) { 
    if(this.authService.isAuthorized()) {
      this.authService.me().subscribe(response => {
        this.user = response;
        let name_devider = response.name.split(" ", 2);
        this.user.first_name = name_devider[0];
        this.user.last_name = name_devider[1];
      },
      err => {
        this.error = "Something wrong! Please try after sometimes.";
      });
    }
    else {
      route.navigateByUrl('/');
    }
  }

  public not_implemented() {
    this.info = "We are working on this feature!"
  }

  public update_profile() {
    this.userService.updateProfile(this.user).subscribe(response => {
      if(response.success) {
       this.info = response.message;
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

  ngOnInit() {
  }

}
