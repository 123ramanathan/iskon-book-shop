import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockReconciliationPageRoutingModule } from './stock-reconciliation-routing.module';

import { StockReconciliationPage } from './stock-reconciliation.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockReconciliationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [StockReconciliationPage]
})
export class StockReconciliationPageModule {}
