import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferReceiptPageRoutingModule } from './transfer-receipt-routing.module';

import { TransferReceiptPage } from './transfer-receipt.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferReceiptPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TransferReceiptPage]
})
export class TransferReceiptPageModule {}
