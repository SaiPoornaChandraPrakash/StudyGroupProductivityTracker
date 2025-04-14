import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div *ngIf="toast.visible" class="toast-msg alert alert-{{ toast.type }} fixed-top m-3" style="z-index: 1050;">
      {{ toast.message }}
    </div>
  `
})
export class ToastComponent {
  constructor(public toast: ToastService) {}
}