import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAgePage } from './edit-age.page';

const routes: Routes = [
  {
    path: '',
    component: EditAgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAgePageRoutingModule {}
