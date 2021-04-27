import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './services/fire.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.auth.anonymous('local');
    this.init();
  }

  async ionViewDidEnter() {
  }

  async init(){
    this.route.url.pipe(map(segments => segments.join(''))).subscribe( u => {
      if(u) {
        console.log(u);
      }
    })
  }
}
