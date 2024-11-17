import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model'; 

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenses';
  private userApiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {}

  // Fetch all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Fetch a single expense by ID
  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  // Add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Update an existing expense
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense}`, expense);
  }

  // Optionally, delete an expense by ID
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.userApiUrl, user);
  }
}
