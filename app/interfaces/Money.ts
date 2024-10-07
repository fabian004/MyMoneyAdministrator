// interfaces/Money.ts

export enum MoneyType {
  Personal = "Personal", // Dinero propio
  Debt = "Debt" // Deuda de dinero
}

export interface Money {
    id: number;
    name: string;
    type: MoneyType;
    amount: number;
    note: string;
    user: string;
    created_at: string;
  }
  