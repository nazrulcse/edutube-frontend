import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-instructor-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class InstructorSidenavComponent implements OnInit {

  auth:any = false;
  user: any = {
    name: ''
  }
  env = {};
  constructor(private authService: AuthenticationService,
  	private route: Router) { 
    this.auth = this.authService.isAuthorized();
    this.env = environment;
  }

  ngOnInit() {
  	if(this.auth) {
      this.user = this.authService.getAuthUser();
    }
    else {
      this.route.navigateByUrl('/');
    }
  }

}
