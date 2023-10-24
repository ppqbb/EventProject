import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatHellpPage } from './chat-hellp.page';

const routes: Routes = [
  {
    path: '',
    component: ChatHellpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatHellpPageRoutingModule {}
