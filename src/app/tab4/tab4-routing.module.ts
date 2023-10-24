import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'edit-age',
    loadChildren: () => import('../edit-age/edit-age.module').then( m => m.EditAgePageModule)
  },
  {
    path: 'boost-page',
    loadChildren: () => import('../boost-page/boost-page.module').then( m => m.BoostPagePageModule)
  },
  {
    path: 'all-event',
    loadChildren: () => import('../all-event/all-event.module').then( m => m.AllEventPageModule)
  },
  {
    path: 'all-event-boost',
    loadChildren: () => import('../all-event-boost/all-event-boost.module').then( m => m.AllEventBoostPageModule)
  },
  {
    path: 'chat-hellp',
    loadChildren: () => import('../chat-hellp/chat-hellp.module').then( m => m.ChatHellpPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
