import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectPage } from './prospect.page';

const routes: Routes = [
  {
    path: '',
    component: ProspectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectPageRoutingModule {}
