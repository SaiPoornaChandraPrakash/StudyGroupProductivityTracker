import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="container mt-4">
      <h3>Register</h3>
      <form (submit)="register()" class="w-50">
        <div class="form-group">
          <label>Name</label>
          <input [(ngModel)]="user.name" name="name" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input [(ngModel)]="user.email" name="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input [(ngModel)]="user.password" name="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-success" type="submit">Register</button>
        <div *ngIf="errorMessage" class="alert alert-danger mt-2">{{ errorMessage }}</div>
      </form>
    </div>
  `
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}
  
  register() {
    const baseUrl='https://localhost:5555'
    this.http.post(`${baseUrl}/api/auth/register`, this.user).subscribe({
      next: (res: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}