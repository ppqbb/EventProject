import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SendMessages } from '../sendMesseges/send-messages';
import { EventDetailsPageModule } from '../event-details/event-details.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    SendMessages,
    EventDetailsPageModule
  ],
  declarations: [Tab2Page],
  providers: [SendMessages],
})
export class Tab2PageModule {}

