import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  @Input() user;
  constructor() { }

  ngOnInit() {
  }

}
