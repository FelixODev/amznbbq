import { Component } from '@angular/core';
import { AuthService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService) {
    this.auth.anonymous();
  }

  ionViewDidEnter() {
  }
}
