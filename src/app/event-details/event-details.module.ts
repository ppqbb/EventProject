import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventDetailsPageRoutingModule } from './event-details-routing.module';
import { EventDetailsPage } from './event-details.page';
import { Tab2Page } from '../tab2/tab2.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailsPageRoutingModule,
  ],
  declarations: [EventDetailsPage],
  providers:[Tab2Page]
})
export class EventDetailsPageModule {}
