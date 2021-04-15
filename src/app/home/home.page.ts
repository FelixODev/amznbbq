import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(private auth: AngularFireAuth, private alert: AlertController) {}

  ionViewDidEnter() {
    this.auth.signInAnonymously().then( async (r) => {
      const a = await this.alert.create({
        header: "Anonymous Sign-In",
        message: 'You are signed in! Kind of...',
        buttons: ['Ok'],
        mode:"ios"
      });
      await a.present();
    }).catch( async (e) => {
      const a = await this.alert.create({
        header: "Anonymous Sign-In",
        message: 'You are not signed in...',
        buttons: ['Ok'],
        mode:"ios"
      });
      await a.present();
    })
  }

}
