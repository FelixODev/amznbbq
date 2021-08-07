import { Component, OnInit } from '@angular/core';
import { User } from 'functions/src/models/user';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/fire.service';
import { PopoverController } from '@ionic/angular';
import { DatePopoverComponent } from 'src/app/components/date-popover/date-popover.component';
import { Share } from '@capacitor/share';
import { AlertService } from 'src/app/services/alert.service';

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
    private popover: PopoverController,
    private alert: AlertService
  ) { }

  user: User | any = {};
  dates: any[] = [];
  users: any[] = [];
  pros: any[] = [];
  display: 'available'|'prospects' = 'available';

  async ngOnInit() {
    this.user = await this.route.snapshot.data.user;

    const preferedDays = this.listOfPerferedDays(this.user);
    this.dates = this.getAvailableDaysInMonth(preferedDays);

    this.users = await this.db.list('users');

    this.pros = await this.db.where({
      c: 'prospects',
      w: 'uids',
      o: 'array-contains', 
      q: this.user.uid,
      id: 'id'
    })

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
      event: e,
    });
    await ctrl.present();
  }

  share = async (id) => {
    await Share.share({
      title: 'Meetup Proposal',
      text: 'Confirm to bump up this proposed meetup date',
      url: 'https://amznbbq.web.app/prospect/'+id,
      dialogTitle: 'Share this meetup date',
    });
  }

  async prospect(date) {
    const u = this.user;
    const c = await this.alert.confirm('Would you like to prospect and share interest for this date?');
    if(c){
      await this.db.add('prospects', {
        prospector: (this.users.find(e => e.uid == u.uid))?.displayName||null,
        date: date.toString(),
        uids: [u.uid],
        uid: u.uid
      });
      window.location.reload();
    };
  }

  segmentChanged(ev: any) {
    const v = ev?.detail?.value;
    this.display = v;
  }

}
