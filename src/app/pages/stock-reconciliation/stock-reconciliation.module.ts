import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReconciliationPageRoutingModule } from './stock-reconciliation-routing.module';

import { StockReconciliationPage } from './stock-reconciliation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReconciliationPageRoutingModule
  ],
  declarations: [StockReconciliationPage]
})
export class StockReconciliationPageModule {}
