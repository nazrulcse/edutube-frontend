import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items = [1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  	setTimeout(() => {
      $('#latest-uploads, #top-shared, #top-viewed').slick({
        slidesToShow: 4,
        slidesToScroll: 1
  	  });
  	}, 100);
  }

}
