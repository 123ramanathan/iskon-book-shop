import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WrongReceiptPageRoutingModule } from './wrong-receipt-routing.module';

import { WrongReceiptPage } from './wrong-receipt.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WrongReceiptPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WrongReceiptPage]
})
export class WrongReceiptPageModule {}
