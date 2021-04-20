import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth, protected alert: AlertController
  ){}

  async anonymous() {
    const r = await this.auth.signInAnonymously();
    const a = await this.alert.create({
      header: "Anonymous Sign-In",
      message: (r)?'You are signed in! Kind of...':'You are not signed in...',
      buttons: ['Ok'],
      mode:"ios"
    });
    await a.present();
    return r;
  }

  state$ = this.auth.authState;

  async user() {
    return this.auth.currentUser
  }
}



@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    constructor(private db: AngularFirestore){}

    async get(c:string, d:string) {
      const g = await this.db.collection(c).doc(d).get().toPromise()
      return g.data()
    }

    async update(c:string, d:string, data) {
      return this.db.collection(c).doc(d).update(data)
    }
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private db: FirestoreService,
    private alert: AlertController
  ){}

  state$ = this.auth.state$;

  async current() {
    return this.auth.user()
  }

  async get() {
    const user:any = await this.current();
    return (user)?this.db.get('users', user?.uid):Promise.resolve(null)
  }

  async update(data) {
    const user:any = await this.current();
    try {
      await this.db.update('users', user?.uid, data);
      const a = await this.alert.create({
        header: "Record Updated",
        message: `Your preferences were updated.`,
        buttons: ['Ok'],
        mode:"ios"
      });
      return a.present();
    } catch(e) {
      const a = await this.alert.create({
        header: "No Record Update",
        message: `Please refresh and try again. If the problem persists please contact Felix...`,
        buttons: ['Ok'],
        mode:"ios"
      });
      return a.present();
    }
  }

  async display(m: string) {
    const a = await this.alert.create({
      header: "User Info",
      message: `Your user id is: ${m}`,
      buttons: ['Ok'],
      mode:"ios"
    });
    return a.present();
  }
}
