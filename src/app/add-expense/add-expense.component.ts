import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
})
export class AddExpenseComponent implements OnInit {
  expenses: any[] = [];
  expense = { userId: '', date: '', category: '', description: '', amount: 0 };
  userId: string | null = null;
  successMessage: string | null = null; 
  constructor(
    private expenseService: ExpenseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadExpenses();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      console.log('User ID:', this.userId);
      this.expense.userId = this.userId || ''; 
    });
  }

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

  onSubmit() {
    this.expenseService.addExpense(this.expense).subscribe(
      (newExpense) => {
        this.expenses.push(newExpense);
        this.expense = { userId: this.userId || '', date: '', category: '', description: '', amount: 0 }; // Reset form

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      (error) => {
        console.error('Failed to add expense:', error);
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
