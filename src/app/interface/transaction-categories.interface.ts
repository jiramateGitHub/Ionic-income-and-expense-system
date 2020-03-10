export abstract class TransactionCategories_Interface{
  abstract get_categories_income():void; //method
}

export class TransactionCategories_Income extends TransactionCategories_Interface{
 
  get_categories_income(): string {
      return `TransactionCategoriesIncome`;
  }
}

export class TransactionCategories_Expense extends TransactionCategories_Interface{
  get_categories_income(): string {
    return `TransactionCategoriesIncome`;
  }
}
