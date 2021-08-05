import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.page.html',
  styleUrls: ['./prospect.page.scss'],
})
export class ProspectPage implements OnInit {

  user: any;
  pr: any;
  added: boolean;

  constructor(
    private ar: ActivatedRoute,
    private db: FirestoreService,
  ) { }

  async ngOnInit() {
    const pid = this.ar.snapshot.paramMap.get('date_id');
    this.user = await this.ar.snapshot.data.user;
    this.pr = await this.db.get('prospects', pid);
    this.added = (this.pr?.ids.includes(this.user.uid))?true:false;
  }

  async update() {
    const uid = this.user?.uid;
    if(!this.added){
      this.pr.ids.push(uid);
    } else {
      this.pr.ids = this.pr.ids.filter(v => v != uid);
    }
    await this.db.update('prospects', this.pr.id, this.pr);
    window.location.reload();
  }

}
