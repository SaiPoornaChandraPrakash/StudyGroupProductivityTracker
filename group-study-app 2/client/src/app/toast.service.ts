import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = '';
  type: 'success' | 'error' | 'info' = 'info';
  visible = false;

  show(msg: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = msg;
    this.type = type;
    this.visible = true;
    setTimeout(() => this.visible = false, 3000);
  }
}