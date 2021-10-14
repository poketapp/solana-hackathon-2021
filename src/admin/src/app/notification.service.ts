import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccess(title: string, message: string): void {
    this.toastr.success(message, title);
  }

  showError(title: string, message: string): void {
    this.toastr.error(message, title);
  }

  showInfo(title: string, message: string): void {
    this.toastr.info(message, title);
  }

  showWarning(title: string, message: string): void {
    this.toastr.warning(message, title);
  }
}
