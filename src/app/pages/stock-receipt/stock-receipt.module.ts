import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReceiptPageRoutingModule } from './stock-receipt-routing.module';

import { StockReceiptPage } from './stock-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReceiptPageRoutingModule
  ],
  declarations: [StockReceiptPage]
})
export class StockReceiptPageModule {}
