import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense-api.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
})
export class EditExpenseComponent implements OnInit {
  expense: Expense | undefined;

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit() {
    if (this.expense) {
      this.expenseService.updateExpense(this.expense);
    }
  }
}
