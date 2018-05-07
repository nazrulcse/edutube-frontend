import {EventEmitter} from '@angular/core';

export class EventService {
  
  dispatcher: EventEmitter<any> = new EventEmitter();
  
  constructor() {}

  emitAuthEvent(auth:boolean) {
    this.dispatcher.emit(auth);
  }
  
  getEmitter() {
    return this.dispatcher;
  }
}