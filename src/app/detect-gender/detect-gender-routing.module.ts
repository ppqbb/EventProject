import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectGenderPage } from './detect-gender.page';

const routes: Routes = [
  {
    path: '',
    component: DetectGenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetectGenderPageRoutingModule {}
