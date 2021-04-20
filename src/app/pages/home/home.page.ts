import { Component } from '@angular/core';
import { UserService } from 'src/app/services/fire.service';
import { User } from 'functions/src/models/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(
    private user$: UserService,
    private alert: AlertController
  ) {}

  user:User | any = {};
  updated: any;

  ionViewDidEnter() {
    this.user$.state$.subscribe(async u => {
      if(u) {
        let usr = await this.user$.get()||{
          uid: u.uid
        };
        this.user = usr;
        this.updated = this.user;
      }
    });
  }

  async addDate() {
    if(Array.isArray(this.user?.excludeDates)){
      if(this.user.excludeDates.includes(null)){
        await this.showAlert("Please enter a date first");
      } else {
        this.user.excludeDates.push(null);
      }
    } else {
      this.user.excludeDates = [];
      this.user.excludeDates.push(null);
    }
  }

  async update() {
    // if(!this.disable())
    await this.user$.update(this.user);
    this.updated = this.user;
  }

  disable(){
    return (JSON.stringify(this.user) == JSON.stringify(this.updated))?true:false;
  }

  async showAlert(m: string, h?: string) {
    const a = await this.alert.create({
      header: h||'Alert',
      message: m,
      mode: 'ios',
      buttons: ['Dismiss']
    });
    return await a.present()
  }

}
