import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-group-create',
  template: `
    <h3>Create Group</h3>
    <form (ngSubmit)="createGroup()">
      <input [(ngModel)]="group.name" name="name" placeholder="Group Name" required />
      <input [(ngModel)]="group.description" name="description" placeholder="Description" />
      <button type="submit">Create</button>
      <div *ngIf="message">{{ message }}</div>
    </form>
  `
})
export class GroupCreateComponent {
  group = { name: '', description: '' };
  message = '';

  constructor(private http: HttpClient) {}

  createGroup() {
    const baseUrl='https://localhost:5555';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    this.http.post(`${baseUrl}/api/group/create`, this.group, { headers }).subscribe({
      next: (res: any) => {
        this.message = 'Group created successfully!';
        this.group = { name: '', description: '' };
      },
      error: err => this.message = err.error.message
    });
  }
}