import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mt-4">
      <h3>Login</h3>
      <form (submit)="login()" class="w-50">
        <div class="form-group">
          <label>Email</label>
          <input [(ngModel)]="user.email" name="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input [(ngModel)]="user.password" name="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary" type="submit">Login</button>
        <div *ngIf="errorMessage" class="alert alert-danger mt-2">{{ errorMessage }}</div>
      </form>
    </div>
  `
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
      const baseUrl='https://localhost:5555'
    this.http.post(`${baseUrl}/api/auth/login`, this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }
}