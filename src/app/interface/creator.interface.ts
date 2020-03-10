import { TransactionCategories_Interface, TransactionCategories_Income, TransactionCategories_Expense } from './transaction-categories.interface';
import { Observable } from 'rxjs';
import { ServicesService, MCategories } from '../services/services.service';
import { Component, OnInit } from '@angular/core';
export abstract class TransactionCategories_Creator {
    public abstract factoryMethod(servicesService : ServicesService): TransactionCategories_Interface;
    public get_categories(servicesService : ServicesService) : Observable<MCategories[]>{
        // Call the factory method to create a Product object.
        const product = this.factoryMethod(servicesService);
        // Now, use the product.
        return product.get_categories();
    }
}

export class TransactionCategories_Creator_Income extends TransactionCategories_Creator {
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionCategories_Income(servicesService);
    }
}
export class TransactionCategories_Creator_Expense extends TransactionCategories_Creator{
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionCategories_Expense(servicesService);
    }
}