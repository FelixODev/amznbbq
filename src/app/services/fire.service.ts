import { Injectable } from '@angular/core';
import * as f from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireRemoteConfig } from '@angular/fire/remote-config';
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

  async persist(d?:'LOCAL'|'SESSION'|'NONE'){
    return this.auth.setPersistence(f.default.auth.Auth.Persistence[d||'LOCAL'])
  }

  async anonymous(d?:string) {
    if(d){
      await this.persist();
    }
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

  list$(c: string, idField?:string) {
    const options = (idField)?{idField}:undefined;
    return this.db.collection(c).valueChanges(options)
  }

  async list(c: string, idField?:string) {
    return this.list$(c, idField).toPromise()
  }
}



@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private func: AngularFireFunctions){}

  call$(e:string, data?:any) {
    return this.func.httpsCallable(e)(data||null)
  }

  async call(e:string, data?:any){
    return this.call$(e, data).toPromise()
  }

}



@Injectable({
  providedIn: "root"
})
export class AdminService {

  constructor(private auth: AuthService, private db: FirestoreService, private func: FunctionsService, private conf: AngularFireRemoteConfig, private alert: AlertController) {}

  async config(method:string, param:string) {
    const s = await this.conf[method].toPromise();
    return s[param]
  }

  async auid() {
    return await this.config('strings', 'admin_uid');
  }

  // async permission() {
  //   let cuid = (await this.auth.user())?.uid;
  //   const auid =
  //   await this.auth.state$.subscribe(async r => {
  //     cuid = r.uid;
  //   })
  //   return (cuid === auid)?true:false
  // }

  user(){
    return this.auth.state$
  }


  userList$() {
    return this.db.list$('users')
  }

  async deleteUser(uid) {
    const c = await this.showConfirmation('Remove this user?', 'Delete');
    return (c)?this.func.call('user-destroy', uid):null
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



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AuthService,
    private db: FirestoreService,
    private func: FunctionsService,
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

  async(uid: string) {
    return this.func.call('user-destroy', uid)
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
