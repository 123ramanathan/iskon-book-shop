import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockReceiptPage } from './stock-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: StockReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockReceiptPageRoutingModule {}
