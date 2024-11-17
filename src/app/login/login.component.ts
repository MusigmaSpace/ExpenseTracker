import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registrationSuccess: boolean = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if the user came from the signup page
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.registrationSuccess = true;
      }
    });
  }

  onSubmit() {
    if (this.loginForm) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
        
        this.router.navigate(['/dashboard'], { queryParams: { userId: response.userId } });
        },
        error: (err) => {
          console.log('Login failed', err);
          this.loginError = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.loginError = 'Please fill out the form correctly.';
    }
  }
}
