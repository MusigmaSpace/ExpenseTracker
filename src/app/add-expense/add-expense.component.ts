import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-api.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  // styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenses: any[] = [];
  expense = { date: '', category: '', description: '', amount: 0 };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.loadExpenses();
  }

  // Load expenses from the backend
  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    );
  }

  // Add a new expense
  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe(
      (newExpense) => {
        this.expenses.push(newExpense);
        this.expense = { date: '', category: '', description: '', amount: 0 };  // Reset form
      },
      (error) => {
        console.error('Failed to add expense:', error);
      }
    );
  }
}
