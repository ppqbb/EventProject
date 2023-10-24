import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  
  {
    path: 'boost-page',
    loadChildren: () => import('../boost-page/boost-page.module').then( m => m.BoostPagePageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'add-events',
    loadChildren: () => import('../add-events/add-events.module').then( m => m.AddEventsPageModule)
  },
  {
    path: 'event-details',
    loadChildren: () => import('../event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
