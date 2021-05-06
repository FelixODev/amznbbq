import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/fire.service';
import { AlertController } from '@ionic/angular';
import { User } from 'functions/src/models/user';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private admin: AdminService,
    private alert: AlertController,
    private router: Router
  ) {}

  users$: User | any = of([]);

  processing: any = {};

  ngOnInit() {
    this.admin.user()
    .subscribe(async r => {
      if(r){
        const auid = await this.admin.auid();
        const confirm = (auid == r.uid);
        // console.log({auid, uid: r.uid, confirm});
        if(r){
          this.users$ = this.admin.userList$();
        } else {
          this.router.navigateByUrl('/')
        }
      } else {
        const u = await this.admin.login();
      }
    });

  }

  async removeUser(uid, i) {
    this.processing[i] = true;
    const d = await this.admin.deleteUser(uid);
    setTimeout(() => {
      this.processing[i] = false;
    }, 1500);
  }

}
