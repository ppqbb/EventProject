import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetectGenderPageRoutingModule } from './detect-gender-routing.module';

import { DetectGenderPage } from './detect-gender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetectGenderPageRoutingModule
  ],
  declarations: [DetectGenderPage]
})
export class DetectGenderPageModule {}
