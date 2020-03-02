import { TabReportPageModule } from './../tab_report/tab-report.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'transaction_input',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/transaction_input/transaction-input/transaction-input.module').then( m => m.TransactionInputPageModule)
          }
        ]
      },
      {
        path: 'tab_wallet',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab_wallet/tab-wallet.module').then(m => m.TabWalletPageModule)
          }
        ]
      },
      {
        path: 'tab_report',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab_report/tab-report.module').then(m => m.TabReportPageModule)
          }
        ]
      },
      {
        path: 'tab_account',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab_account/tab-account.module').then(m => m.TabAccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab_wallet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab_wallet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
