import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterSendEmailPage } from './register-send-email.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterSendEmailPage
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterSendEmailPageRoutingModule {}
