import { Component } from '@angular/core';
import {EventService} from '../services/event_service';
import { LoaderComponent } from './loader/loader.component';

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
  public loader = LoaderComponent;

  constructor(public events: EventService) {
     this.events.dispatcher.subscribe(auth => {
       this.app_data.auth = auth;
     });
  }
}
