import { ServicesService, MCategories } from './../../services/services.service';
import { TransactionInputPage } from './../transaction_input/transaction-input.page';
import { TransactionCategories_Creator_Income , TransactionCategories_Creator_Expense } from './../../interface/creator.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ModalController, AlertController, NavParams, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-category',
  templateUrl: './transaction-category.page.html',
  styleUrls: ['./transaction-category.page.scss'],
})
export class TransactionCategoryPage  implements OnInit  {
  private type_input: string;
  private obj_category: Observable<MCategories[]>;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private toastController: ToastController, 
    private modalController: ModalController,
    private alertController: AlertController,
    private navParams: NavParams,
    private navCtrl:NavController,
    private servicesService:ServicesService
  ) { 
    this.type_input = navParams.get('type_input');
    if(this.type_input == "parent_income"){
      var obj_TransactionCategories_Creator = new TransactionCategories_Creator_Income();
      this.obj_category = obj_TransactionCategories_Creator.get_categories(this.servicesService)
    }else if(this.type_input == "parent_expense"){
      var obj_TransactionCategories_Creator = new TransactionCategories_Creator_Expense();
      this.obj_category = obj_TransactionCategories_Creator.get_categories(this.servicesService)
    }else if(this.type_input == "income"){
      var obj_TransactionCategories_Creator = new TransactionCategories_Creator_Expense();
      this.obj_category = obj_TransactionCategories_Creator.get_categories(this.servicesService)
    }else if(this.type_input == "expense"){
      var obj_TransactionCategories_Creator = new TransactionCategories_Creator_Expense();
      this.obj_category = obj_TransactionCategories_Creator.get_categories(this.servicesService)
    }
  }

  ngOnInit(){}


  // * @Function   : add_category => เลือก Category และเรียกคำสั่งปิด modal 
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async add_category(name:string,type:number){
    this.modalController.dismiss({name, type});
  }

  // * @Function   : close_modal => คำสั่งปิด modal
  // * @Author     : Jiramate Phuaphan
  // * @Create Date: 2563-03-02
  async close_modal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
