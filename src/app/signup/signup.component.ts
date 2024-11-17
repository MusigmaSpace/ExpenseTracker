import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense-api.service';  // Service to interact with the backend

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService  
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
      const { email, password } = this.signupForm.value;
      const newUser = { email, password };

      console.log(newUser, 'newUser');
      

      this.expenseService.registerUser(newUser).subscribe(
        response => {
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    
  }
}
