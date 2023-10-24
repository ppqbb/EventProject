import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllEventBoostPageRoutingModule } from './all-event-boost-routing.module';

import { AllEventBoostPage } from './all-event-boost.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllEventBoostPageRoutingModule
  ],
  declarations: [AllEventBoostPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AllEventBoostPageModule {}
