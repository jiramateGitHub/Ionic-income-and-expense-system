import { MWalletService } from './services/m_wallet/m-wallet.service';
import { MTransactionService } from './services/m_transaction/m-transaction.service';
import { MPersonService , MPerson} from './services/m_person/m-person.service';
import { MSubCategoriesService } from './services/m_sub_categories/m-sub-categories.service';
import { MCategoriesService } from './services/m_categories/m-categories.service';
import { TransferInputPage } from './pages/transfer_input/transfer-input.page';
import { CategoryInputPage } from './pages/category_input/category-input.page';
import { WalletInputPage } from './pages/wallet_input/wallet-input.page';
import { TransactionInputPage } from './pages/transaction_input/transaction-input.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { TransactionCategoryPage } from './pages/transaction_category/transaction-category.page';

@NgModule({
  declarations: [
    AppComponent,
    TransactionInputPage,
    TransactionCategoryPage,
    WalletInputPage,
    CategoryInputPage,
    TransferInputPage
  ],
  entryComponents: [
    TransactionInputPage,
    TransactionCategoryPage,
    WalletInputPage,
    CategoryInputPage,
    TransferInputPage
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    MCategoriesService,
    MSubCategoriesService,
    MPersonService,
    MTransactionService,
    MWalletService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
