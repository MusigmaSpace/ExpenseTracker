import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-api.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    
    this.expenseService.getExpenses().subscribe(data => this.expenses = data);
    console.log((this.expenses,'data'));
    
  }


}
