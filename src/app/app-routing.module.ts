import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'transaction-input',
    loadChildren: () => import('./pages/transaction_input/transaction-input.module').then( m => m.TransactionInputPageModule)
  },
  {
    path: 'transaction-category',
    loadChildren: () => import('./pages/transaction_category/transaction-category.module').then( m => m.TransactionCategoryPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'wallet-input',
    loadChildren: () => import('./pages/wallet_input/wallet-input.module').then( m => m.WalletInputPageModule)
  },
  {
    path: 'category-input',
    loadChildren: () => import('./pages/category_input/category-input.module').then( m => m.CategoryInputPageModule)
  },
  {
    path: 'transfer-input',
    loadChildren: () => import('./pages/transfer_input/transfer-input.module').then( m => m.TransferInputPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
