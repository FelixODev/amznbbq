import { Component } from '@angular/core';
import { UserService } from 'src/app/services/fire.service';
import { User } from 'functions/src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  constructor(
    private user$: UserService
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

  async update() {
    // if(!this.disable())
    await this.user$.update(this.user);
    this.updated = this.user;
  }

  disable(){
    return (JSON.stringify(this.user) == JSON.stringify(this.updated))?true:false;
  }

}
