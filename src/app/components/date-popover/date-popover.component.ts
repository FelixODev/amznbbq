import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'date-popover',
  templateUrl: './date-popover.component.html',
  styleUrls: ['./date-popover.component.scss'],
})
export class DatePopoverComponent implements OnInit {

  date: any;
  users: any;

  ctrl;

  constructor() { }

  ngOnInit() {}

}
