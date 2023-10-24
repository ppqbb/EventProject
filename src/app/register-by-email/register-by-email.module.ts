import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterByEmailPageRoutingModule } from './register-by-email-routing.module';

import { RegisterByEmailPage } from './register-by-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterByEmailPageRoutingModule
  ],
  declarations: [RegisterByEmailPage]
})
export class RegisterByEmailPageModule {}
