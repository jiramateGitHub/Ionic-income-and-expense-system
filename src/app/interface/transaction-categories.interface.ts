import { MCategoriesService } from './../services/m_categories/m-categories.service';
import { ServicesService, MCategories, MSubCategories } from './../services/services.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

// * @Function   : TransactionCategories_Interface => interface TransactionCategories_Interface
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export interface  TransactionCategories_Interface {
  get_categories(): Observable<MCategories[]>; //method
  get_sub_categories(): Observable<MSubCategories[]>; //method

}

// * @Function   : TransactionCategories_Income => Concrete TransactionCategories_Income
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionCategories_Income implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MCategoriesService.get_obs_mcategories(1)
  }
  get_sub_categories(): Observable<MSubCategories[]>{
    return null;
  }
}

// * @Function   : TransactionCategories_Income => Concrete TransactionCategories_Expense
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionCategories_Expense implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MCategoriesService.get_obs_mcategories(2);
  }
  get_sub_categories(): Observable<MSubCategories[]>{
    return null;
  }
}

// * @Function   : TransactionCategories_Income => Concrete TransactionSubCategories_Income
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionSubCategories_Income implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]>{
    return null;
  }
  get_sub_categories(): Observable<MSubCategories[]> {
    return this.ServicesService.MSubCategoriesService.get_obs_msubcategories(1);
  }
}

// * @Function   : TransactionCategories_Income => Concrete TransactionSubCategories_Expense
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionSubCategories_Expense implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]>{
    return null;
  }
  get_sub_categories(): Observable<MSubCategories[]> {
    return this.ServicesService.MSubCategoriesService.get_obs_msubcategories(2);
  }
}
export class TransactionSubCategories_Income implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MSubCategoriesService.get_obs_mcategories(1)
  }
}

export class TransactionSubCategories_Expense implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MSubCategoriesService.get_obs_mcategories(2);
  }
}
