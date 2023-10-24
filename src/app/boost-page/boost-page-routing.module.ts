import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoostPagePage } from './boost-page.page';

const routes: Routes = [
  {
    path: '',
    component: BoostPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoostPagePageRoutingModule {}
