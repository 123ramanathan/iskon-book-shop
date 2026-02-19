import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScanPageRoutingModule } from './barcode-scan-routing.module';

import { BarcodeScanPage } from './barcode-scan.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScanPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BarcodeScanPage]
})
export class BarcodeScanPageModule {}
