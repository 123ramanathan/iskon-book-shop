import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  // },
  {
    path: '',
    redirectTo: 'login', // use a relative path, not '/tabs/catalog'
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then( m => m.CatalogPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./pages/stock/stock.module').then( m => m.StockPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'stock-reconciliation',
    loadChildren: () => import('./pages/stock-reconciliation/stock-reconciliation.module').then( m => m.StockReconciliationPageModule)
  },
  {
    path: 'stock-receipt',
    loadChildren: () => import('./pages/stock-receipt/stock-receipt.module').then( m => m.StockReceiptPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.module').then( m => m.ThankyouPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tabs/:id',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'close-shift',
    loadChildren: () => import('./pages/close-shift/close-shift.module').then( m => m.CloseShiftPageModule)
  },
  {
    path: 'transfer-receipt',
    loadChildren: () => import('./pages/transfer-receipt/transfer-receipt.module').then( m => m.TransferReceiptPageModule)
  },
  {
    path: 'transfer-receipt/:id',
    loadChildren: () => import('./pages/transfer-receipt/transfer-receipt.module').then( m => m.TransferReceiptPageModule)
  },
  {
    path: 'wrong-receipt',
    loadChildren: () => import('./pages/wrong-receipt/wrong-receipt.module').then( m => m.WrongReceiptPageModule)
  },
  {
    path: 'wrong-receipt/:id',
    loadChildren: () => import('./pages/wrong-receipt/wrong-receipt.module').then( m => m.WrongReceiptPageModule)
  },
  {
    path: 'receipt-detail',
    loadChildren: () => import('./pages/receipt-detail/receipt-detail.module').then( m => m.ReceiptDetailPageModule)
  },
  {
    path: 'receipt-detail/:id',
    loadChildren: () => import('./pages/receipt-detail/receipt-detail.module').then( m => m.ReceiptDetailPageModule)
  },  {
    path: 'barcode-scan',
    loadChildren: () => import('./pages/barcode-scan/barcode-scan.module').then( m => m.BarcodeScanPageModule)
  }

]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
