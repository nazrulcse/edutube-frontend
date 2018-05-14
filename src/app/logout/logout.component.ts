import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';
import { EventService } from '../../services/event_service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService, 
  	private route: Router,
  	private events: EventService) {

  	}

  ngOnInit() {
  	this.authService.logout();
    this.events.emitAuthEvent(false);
    this.route.navigateByUrl('');
  }

}
