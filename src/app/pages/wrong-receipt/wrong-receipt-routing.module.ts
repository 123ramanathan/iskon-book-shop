import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WrongReceiptPage } from './wrong-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: WrongReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WrongReceiptPageRoutingModule {}
