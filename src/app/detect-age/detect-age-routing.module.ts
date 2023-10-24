import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetectAgePage } from './detect-age.page';

const routes: Routes = [
  {
    path: '',
    component: DetectAgePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetectAgePageRoutingModule {}
