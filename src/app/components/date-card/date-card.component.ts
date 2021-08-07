import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss'],
})
export class DateCardComponent implements OnInit {

  @Input('id') id: any;
  @Input('date') date: any;
  @Input('users') users: any;
  @Input('buttons') buttons: any[];

  prefTime: string = "all times";

  constructor() { }

  ngOnInit() {
  }

}
