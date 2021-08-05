import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/fire.service';
import { User } from 'functions/src/models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private user$: UserService,
    private route: ActivatedRoute,
    private alert: AlertService
    // private router: Router,
  ) {
  }

  user:User | any = {};
  updated: any;

  async ngOnInit() {
    this.user = await this.route.snapshot.data.user;
    this.updated = {...this.user};
  }

  async removeDate(i) {
    const b = await this.alert.confirm('Would you like to remove this date exclusion?', 'Delete');
    if(b) {
      this.user?.excludeDates.splice(i,1);
    }
  }

  async addDate() {
    if(Array.isArray(this.user?.excludeDates)){
      if(this.user.excludeDates.includes(null)){
        await this.alert.confirm("Please enter a date first.");
      } else if(this.duplicates()) {

        await this.alert.confirm("You listed the same date twice. Please change or remove the duplicate.");
      } else {
        this.user.excludeDates.push(null);
      }
    } else {
      this.user.excludeDates = [];
      this.user.excludeDates.push(null);
    }
  }

  async update() {
    if(!this.identical())
    await this.user$.update(this.user);
    this.updated = {...this.user};
  }

  identical(){
    return (JSON.stringify(this.user) == JSON.stringify(this.updated))?true:false;
  }

  duplicates() {
    const arr = this.user?.excludeDates;
    return (arr.length !== new Set(arr).size)?true:false
  }

  // goToDates() {
  //   this.router.navigate(['/dates']);
  // }

}
