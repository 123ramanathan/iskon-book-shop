import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiptDetailPageRoutingModule } from './receipt-detail-routing.module';

import { ReceiptDetailPage } from './receipt-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReceiptDetailPage]
})
export class ReceiptDetailPageModule {}
