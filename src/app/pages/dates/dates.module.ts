import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatesPageRoutingModule } from './dates-routing.module';

import { DatesPage } from './dates.page';
import { DateCardModule } from 'src/app/components/date-card/date-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatesPageRoutingModule,
    DateCardModule
  ],
  declarations: [DatesPage]
})
export class DatesPageModule {}
