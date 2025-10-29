import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseShiftPage } from './close-shift.page';

const routes: Routes = [
  {
    path: '',
    component: CloseShiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseShiftPageRoutingModule {}
