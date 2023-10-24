import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterByEmailPage } from './register-by-email.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterByEmailPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterByEmailPageRoutingModule {}
