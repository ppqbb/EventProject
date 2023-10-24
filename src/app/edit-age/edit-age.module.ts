import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAgePageRoutingModule } from './edit-age-routing.module';

import { EditAgePage } from './edit-age.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAgePageRoutingModule
  ],
  declarations: [EditAgePage]
})
export class EditAgePageModule {}
