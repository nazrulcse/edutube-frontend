import { Component } from '@angular/core';
import {EventService} from '../services/event_service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  app_data = {
  	auth: false
  }

  constructor(public events: EventService) {
     this.events.dispatcher.subscribe(auth => {
       this.app_data.auth = auth;
     });
  }
}
