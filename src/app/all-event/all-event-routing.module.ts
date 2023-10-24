import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllEventPage } from './all-event.page';

const routes: Routes = [
  {
    path: '',
    component: AllEventPage
  },
  {
    path: 'event-details',
    loadChildren: () => import('../event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'boost-page',
    loadChildren: () => import('../boost-page/boost-page.module').then( m => m.BoostPagePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllEventPageRoutingModule {}
