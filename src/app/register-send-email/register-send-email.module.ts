import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSendEmailPageRoutingModule } from './register-send-email-routing.module';

import { RegisterSendEmailPage } from './register-send-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterSendEmailPageRoutingModule
  ],
  declarations: [RegisterSendEmailPage]
})
export class RegisterSendEmailPageModule {}
