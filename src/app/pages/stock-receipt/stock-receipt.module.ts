import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReceiptPageRoutingModule } from './stock-receipt-routing.module';

import { StockReceiptPage } from './stock-receipt.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReceiptPageRoutingModule,
    ComponentsModule
  ],
  declarations: [StockReceiptPage]
})
export class StockReceiptPageModule {}
