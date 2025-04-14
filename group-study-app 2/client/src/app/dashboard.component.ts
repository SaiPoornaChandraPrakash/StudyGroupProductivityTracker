import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Welcome to your Dashboard</h2>
    <a routerLink="/create-group">Create Group</a>
    <div *ngIf="groups.length">
      <h4>Your Groups:</h4>
      <ul>
        <li *ngFor="let group of groups">{{ group.name }}</li>
      </ul>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  groups: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const baseUrl='https://localhost:5555';
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    this.http.get(`${baseUrl}/api/group/my-groups`, { headers }).subscribe({
      next: (res: any) => this.groups = res,
      error: err => console.error(err)
    });
  }
}