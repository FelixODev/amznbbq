import { Component, OnInit } from '@angular/core';
import { User } from 'functions/src/models/user';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/fire.service';
import { PopoverController } from '@ionic/angular';
import { DatePopoverComponent } from 'src/app/components/date-popover/date-popover.component';

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private db: FirestoreService,
    private popover: PopoverController
  ) { }

  user:User | any = {};
  dates:any[] = [];
  users: any[];

  async ngOnInit() {
    this.user = await this.route.snapshot.data.user;

    const preferedDays = this.listOfPerferedDays(this.user);
    this.dates = this.getAvailableDaysInMonth(preferedDays);

    this.db.list$('users').subscribe(u => {
      this.users = u;
    });
  }

  getAvailableDaysInMonth(afms?:any) {
    afms = (!afms||afms?.length == 0)?[1,2,3,4,5]:afms;
    const date = new Date();
    const month = date.getMonth();
    let days = [];
    while (date.getMonth() === month) {
      if(afms.includes(date.getDay())) {
        const excludes = this.user?.excludeDates||[];

        const dateStr = this.properISO(date);

        if(excludes.includes(dateStr)){
          console.log(excludes, dateStr)
        } else {
          days.push(new Date(date));
        }
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  listOfPerferedDays(user) {
    const perfereds = user?.preferedDays||[];
    let arrayOfIndexs = [];
    for (let i = 0; i < perfereds?.length; i++) {
      const pd = perfereds[i];
      const di = days.indexOf(pd);
      arrayOfIndexs.push(di);
    }
    return arrayOfIndexs
  }

  availableUsersForThisDate(d:any) {
    const day = d.getDay();
    const usrs = [];
    let count = 0;
    for (let i = 0; i < this.users?.length; i++) {
      const u = this.users[i];
      const days = this.listOfPerferedDays(u)
      if(days.includes(day)) {
        const excludes = u.excludeDates||[];
        const dateStr = this.properISO(d);
        if(excludes.includes(dateStr)){
        } else {
          count++;
          usrs.push(u);
        }
      }
    }
    // return count;
    return usrs;
  }

  properISO(date:Date) {
    // get proper iso date
    let d = new Date(date);
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  async view(e, date, users) {
    const ctrl = await this.popover.create({
      component: DatePopoverComponent,
      componentProps:{
        date: date,
        users: users,
        ctrl: this.popover
      },
      cssClass: 'pop',
      animated: true,
      // mode: 'ios',
      // event: e,
    });
    await ctrl.present();
  }

}
