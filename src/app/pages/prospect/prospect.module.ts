import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProspectPageRoutingModule } from './prospect-routing.module';

import { ProspectPage } from './prospect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProspectPageRoutingModule
  ],
  declarations: [ProspectPage]
})
export class ProspectPageModule {}
