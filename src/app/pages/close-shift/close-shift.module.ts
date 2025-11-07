import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseShiftPageRoutingModule } from './close-shift-routing.module';

import { CloseShiftPage } from './close-shift.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloseShiftPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CloseShiftPage]
})
export class CloseShiftPageModule {}
