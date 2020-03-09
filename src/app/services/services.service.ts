import { SessionService } from './session/session.service';
import { MTransactionService } from './m_transaction/m-transaction.service';
import { MWalletService } from './m_wallet/m-wallet.service';
import { MPersonService } from './m_person/m-person.service';
import { MSubCategoriesService } from './m_sub_categories/m-sub-categories.service';
import { MCategoriesService } from './m_categories/m-categories.service';
import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

// * @Interface  : interface => เก็บข้อมูล Object สำหรับจัดเก็บลง Firebase
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-01
export interface MPerson {
  id?: string,
  username: string,
  password: string
}
export interface MWallet {
  id?: string,
  username: string,
  wallet_name: string,
  wallet_balance : string,
  wallet_active: string
}
export interface MCategories {
  id?: string,
  categories_name: string,
  categories_type: number,
  categories_active: string
}
export interface MSubCategories {
  id?: string,
  username: string,
  categories_name: string,
  categories_type: number,
  sub_categories_name: string,
  sub_categories_active: string
}
export interface MTransaction {
  id?: string,
  username : string,
  wallet_name : string,
  categories_type : number,
  categories_name : string,
  sub_categories_name : string,
  transaction_amount : string,
  transaction_date : Date,
  transaction_note : string,
  transaction_active : string
}
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // SessionService
  private obj_SessionService : SessionService;
  public get SessionService(): SessionService {
    if(!this.obj_SessionService){
      this.obj_SessionService = this.injector.get(SessionService);
    }
    return this.obj_SessionService;
  }
  // MPersonService
  private obj_MPersonService : MPersonService;
  public get MPersonService(): MPersonService {
    if(!this.obj_MPersonService){
      this.obj_MPersonService = this.injector.get(MPersonService);
    }
    return this.obj_MPersonService;
  }
  // MWalletService
  private obj_MWalletService : MWalletService;
  public get MWalletService(): MWalletService {
    if(!this.obj_MWalletService){
      this.obj_MWalletService = this.injector.get(MWalletService);
    }
    return this.obj_MWalletService;
  }

  // MCategoriesService
  private obj_MCategoriesService : MCategoriesService;
  public get MCategoriesService(): MCategoriesService {
    if(!this.obj_MCategoriesService){
      this.obj_MCategoriesService = this.injector.get(MCategoriesService);
    }
    return this.obj_MCategoriesService;
  }

  // MSubCategoriesService
  private obj_MSubCategoriesService : MSubCategoriesService;
  public get MSubCategoriesService(): MSubCategoriesService {
    if(!this.obj_MSubCategoriesService){
      this.obj_MSubCategoriesService = this.injector.get(MSubCategoriesService);
    }
    return this.obj_MSubCategoriesService;
  }

  // MTransactionService
  private obj_MTransactionService : MTransactionService;
  public get MTransactionService(): MTransactionService {
    if(!this.obj_MTransactionService){
      this.obj_MTransactionService = this.injector.get(MTransactionService);
    }
    return this.obj_MTransactionService;
  }

  constructor(private injector: Injector) { }

}
