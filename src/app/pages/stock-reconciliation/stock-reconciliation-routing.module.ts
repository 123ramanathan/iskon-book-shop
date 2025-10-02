import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockReconciliationPage } from './stock-reconciliation.page';

const routes: Routes = [
  {
    path: '',
    component: StockReconciliationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockReconciliationPageRoutingModule {}
