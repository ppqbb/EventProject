import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatHellpPageRoutingModule } from './chat-hellp-routing.module';

import { ChatHellpPage } from './chat-hellp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatHellpPageRoutingModule
  ],
  declarations: [ChatHellpPage]
})
export class ChatHellpPageModule {}
