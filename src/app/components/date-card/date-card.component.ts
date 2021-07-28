import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'date-card',
  templateUrl: './date-card.component.html',
  styleUrls: ['./date-card.component.scss'],
})
export class DateCardComponent implements OnInit {

  @Input('date') date: any;
  @Input('users') users: any;

  prefTime: string = "all times";

  constructor() { }

  ngOnInit() {
  }

}
