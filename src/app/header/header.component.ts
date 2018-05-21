import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../services/event_service';
import { AuthenticationService } from '../authentication';
import { HelperService } from '../../services/helper_service';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth:any = false;
  user: any = {
    name: ''
  }
  env = {};
  term = '';
  header_categories = [];
  constructor(private events: EventService,
  	private authService: AuthenticationService,
    private helperService: HelperService,
    private router: Router) { 
    this.auth = this.authService.isAuthorized();
    this.env = environment;
    if(this.auth) {
      this.user = this.authService.getAuthUser();
    }
    this.events.dispatcher.subscribe(auth => {
       this.auth = auth;
       if(auth) {
         this.user = this.authService.getAuthUser();
       }
     });
  }

  ngOnInit() {
    this.loadHeaderCategory();
  }

  search() {
    if(this.term.length > 1) {
      this.router.navigate(['/search'], { queryParams: { q: this.term } });
    }
  }

  loadHeaderCategory() {
    this.helperService.getCategories().subscribe(response => {
      if(response.success) {
        this.header_categories = response.categories;
      }
    });
  }

}
