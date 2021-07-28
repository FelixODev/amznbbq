import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DateCardComponent } from './date-card.component';



@NgModule({
  declarations: [
    DateCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DateCardComponent
  ]
})
export class DateCardModule { }
