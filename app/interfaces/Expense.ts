// interfaces/Expense.ts

export enum ExpenseType {
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export interface Expense {
  id: number;
  name: string;
  type: ExpenseType; 
  amount: number;
  note: string;
  user: string;
  created_at: string;
}
