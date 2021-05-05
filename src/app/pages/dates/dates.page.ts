import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  constructor(
    public data: DataService
  ) { }

  dates:any[] = [];

  ngOnInit() {
    this.dates = this.getAvailableDaysInMonthUTC(this.data.preferedDays);
  }

  getAvailableDaysInMonthUTC(afm_dates?:any) {
    const afms = afm_dates||[2,3,4];
    const date = new Date();
    const month = date.getUTCMonth();
    let days = [];
    while (date.getUTCMonth() === month) {
      if(afms.includes(date.getDay())) {
        days.push(new Date(date));
      }
      date.setUTCDate(date.getUTCDate() + 1);
    }
    return days;
  }

}
