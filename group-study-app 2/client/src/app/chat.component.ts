import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  template: `
    <div class="card mt-4" *ngIf="groupId">
      <div class="card-header bg-primary text-white">Group Chat</div>
      <div class="card-body" style="height: 250px; overflow-y: auto;">
        <div *ngFor="let msg of messages">
          <strong>{{ msg.sender?.name || 'You' }}:</strong> {{ msg.text }}
        </div>
      </div>
      <div class="card-footer">
        <form (submit)="sendMessage()" class="d-flex">
          <input [(ngModel)]="newMessage" name="message" class="form-control mr-2" placeholder="Type a message..." required />
          <button class="btn btn-success" type="submit">Send</button>
        </form>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  @Input() groupId: string = '';
  messages: any[] = [];
  newMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    this.http.get(`/api/chat/${this.groupId}`, { headers }).subscribe({
      next: (res: any) => this.messages = res,
      error: err => console.error('Error loading messages', err)
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    const body = { text: this.newMessage };
    const baseUrl="https://localhost:5555"
    this.http.post(`${baseUrl}/api/chat/${this.groupId}`, body, { headers }).subscribe({
      next: (msg: any) => {
        this.messages.push({ ...msg, sender: { name: 'You' } });
        this.newMessage = '';
      },
      error: err => console.error('Error sending message', err)
    });
  }
}