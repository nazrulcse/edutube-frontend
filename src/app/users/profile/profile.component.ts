import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {first_name: '', last_name: ''};
  error = "";
  info = "";
  constructor(private authService: AuthenticationService,
  	private route: Router) { 
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

  ngOnInit() {
  }

}
