import { TransactionCategories_Interface, TransactionCategories_Income, TransactionCategories_Expense ,TransactionSubCategories_Income , TransactionSubCategories_Expense} from './transaction-categories.interface';
import { Observable } from 'rxjs';
import { ServicesService, MCategories, MSubCategories } from '../services/services.service';
import { Component, OnInit } from '@angular/core';

// * @Function   : TransactionCategories_Creator => abstract class TransactionCategories_Creator
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export abstract class TransactionCategories_Creator {
    public abstract factoryMethod(servicesService : ServicesService): TransactionCategories_Interface;
    public get_categories(servicesService : ServicesService) : Observable<MCategories[]>{
        // Call the factory method to create a Product object.
        const categories = this.factoryMethod(servicesService);
        // Now, use the product.
        return categories.get_categories();
    }

    public get_sub_categories(servicesService : ServicesService) : Observable<MSubCategories[]>{
        // Call the factory method to create a Product object.
        const categories = this.factoryMethod(servicesService);
        // Now, use the product.
        return categories.get_sub_categories();
    }
}

// * @Function   : TransactionCategories_Creator => Concrete Creator TransactionCategories_Creator_Income
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionCategories_Creator_Income extends TransactionCategories_Creator {
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionCategories_Income(servicesService);
    }
}

// * @Function   : TransactionCategories_Creator => Concrete Creator TransactionCategories_Creator_Expense
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionCategories_Creator_Expense extends TransactionCategories_Creator{
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionCategories_Expense(servicesService);
    }
}

// * @Function   : TransactionCategories_Creator => Concrete Creator TransactionSubCategories_Creator_Income
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionSubCategories_Creator_Income extends TransactionCategories_Creator {
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionSubCategories_Income(servicesService);
    }
}

// * @Function   : TransactionCategories_Creator => Concrete Creator TransactionSubCategories_Creator_Expense
// * @Author     : Jiramate Phuaphan
// * @Create Date: 2563-03-10
export class TransactionSubCategories_Creator_Expense extends TransactionCategories_Creator{
    public factoryMethod(servicesService : ServicesService): TransactionCategories_Interface {
        return new TransactionSubCategories_Expense(servicesService);
    }
}