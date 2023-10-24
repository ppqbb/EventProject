import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BoostPagePageRoutingModule } from './boost-page-routing.module';
import { BoostPagePage } from './boost-page.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoostPagePageRoutingModule,
  ],
  declarations: [BoostPagePage]
})
export class BoostPagePageModule {}
