// import { Injectable } from '@angular/core';
// import { Expense } from '../models/expense.model';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ExpenseService {
//   private expenses: Expense[] = [];

//   constructor() {}

//   getExpenses(): Observable<Expense[]> {
//     return of(this.expenses);
//   }

//   addExpense(expense: Expense) {
//     this.expenses.push(expense);
//     console.log(this.expenses,'expenses table');
    
//   }

//   getExpenseById(id: number): Expense | undefined {
//     return this.expenses.find(expense => expense.id === id);
//   }

//   updateExpense(updatedExpense: Expense) {
//     const index = this.expenses.findIndex(expense => expense.id === updatedExpense.id);
//     if (index !== -1) {
//       this.expenses[index] = updatedExpense;
//     }
//   }

//   deleteExpense(id: number) {
//     this.expenses = this.expenses.filter(expense => expense.id !== id);
//   }
// }
