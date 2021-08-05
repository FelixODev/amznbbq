import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alert: AlertController
  ) { }

  async show(m: string, h?: string) {
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

  async confirm(m: string, bs?: string, h?: any) {
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
