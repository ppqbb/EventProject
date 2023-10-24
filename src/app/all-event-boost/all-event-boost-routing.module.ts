import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllEventBoostPage } from './all-event-boost.page';


const routes: Routes = [
  {
    path: '',
    component: AllEventBoostPage
  },
  {
    path: 'event-details',
    loadChildren: () => import('../event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllEventBoostPageRoutingModule {}
