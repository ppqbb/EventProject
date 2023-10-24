import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetectAgePageRoutingModule } from './detect-age-routing.module';

import { DetectAgePage } from './detect-age.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetectAgePageRoutingModule,
  ],
  declarations: [DetectAgePage]
})
export class DetectAgePageModule {}
