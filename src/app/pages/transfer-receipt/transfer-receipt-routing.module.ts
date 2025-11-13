import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferReceiptPage } from './transfer-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: TransferReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferReceiptPageRoutingModule {}
