import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expenses: any[] = []; 
  filteredExpenses: any[] = []; 
  userId: string | null = null; 

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userId = params['userId'] || localStorage.getItem('userId');
      console.log('User ID:', this.userId);
      this.loadExpenses(); 
    });
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
        this.filteredExpenses = this.expenses.filter(
          (expense) => expense.userId === this.userId
        );
        console.log('Filtered Expenses:', this.filteredExpenses);
      },
      (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    );
  }

  addExpense() {
    this.router.navigate(['/add-expense'], { queryParams: { userId: this.userId } });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
