import { Component } from '@angular/core';
import { UserService, AuthService } from 'src/app/services/fire.service';
import { User } from 'functions/src/models/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(
    private auth: AuthService,
    private user$: UserService,
    private alert: AlertController
  ) {
  }

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
      } else {
        this.auth.anonymous('local');
      }
    });
  }

  async removeDate(i) {
    const b = await this.showConfirmation('Would you like to remove this date exclusion?', 'Delete');
    if(b) {
      this.user?.excludeDates.splice(i,1);
    }
  }

  async addDate() {
    if(Array.isArray(this.user?.excludeDates)){
      if(this.user.excludeDates.includes(null)){
        await this.showAlert("Please enter a date first.");
      } else if(this.duplicates()) {

        await this.showAlert("You listed the same date twice. Please change or remove the duplicate.");
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

  duplicates() {
    const arr = this.user?.excludeDates;
    return (arr.length !== new Set(arr).size)?true:false
  }

  async showAlert(m: string, h?: string) {
    const a = await this.alert.create({
      header: h||'Alert',
      message: m,
      mode: 'ios',
      buttons: [
        'Dismiss'
      ]
    });
    return await a.present()
  }

  async showConfirmation(m: string, bs?: string, h?: any) {
    let b;
    const a = await this.alert.create({
      header: 'Confirm',
      message: m,
      mode: 'ios',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            b = false;
          }
        },
        {
          text: bs||'Continue',
          handler: () => {
            b = true;
          }
        }
      ]
    });
    await a.present();
    await a.onDidDismiss();
    return b;
  }

}
