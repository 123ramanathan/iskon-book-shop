import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sales',
        loadChildren: () => import('../pages/sales/sales.module').then(m => m.SalesPageModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('../pages/stock/stock.module').then(m => m.StockPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../pages/reports/reports.module').then(m => m.ReportsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/sales',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/sales',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
