import { MCategoriesService } from './../services/m_categories/m-categories.service';
import { ServicesService, MCategories } from './../services/services.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
export interface  TransactionCategories_Interface {
  get_categories(): Observable<MCategories[]>; //method

}

export class TransactionCategories_Income implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MCategoriesService.get_obs_mcategories(1)
  }
}

export class TransactionCategories_Expense implements TransactionCategories_Interface {
  constructor(private ServicesService?: ServicesService) {}
  get_categories(): Observable<MCategories[]> {
    return this.ServicesService.MCategoriesService.get_obs_mcategories(2);
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
