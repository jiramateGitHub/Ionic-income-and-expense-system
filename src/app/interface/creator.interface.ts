import { TransactionCategories_Interface, TransactionCategories_Income, TransactionCategories_Expense } from './transaction-categories.interface';

export abstract class TransactionCategories_Creator{
    public abstract factoryMethod(): TransactionCategories_Interface;
    public someOperation(): void {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        console.log(`Creator: The same creator's code has just worked with ${product.get_categories_income()}`);
    }
}

export class TransactionCategories_Creator_Income extends TransactionCategories_Creator{
    public factoryMethod(): TransactionCategories_Interface {
        return new TransactionCategories_Income();
    }
}
export class TransactionCategories_Creator_Expense extends TransactionCategories_Creator{
    public factoryMethod(): TransactionCategories_Interface {
        return new TransactionCategories_Expense();
    }
}