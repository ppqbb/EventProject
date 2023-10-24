import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventDetailsPage } from './event-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPage
  },
  {
    path: 'report',
    loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailsPageRoutingModule {}
