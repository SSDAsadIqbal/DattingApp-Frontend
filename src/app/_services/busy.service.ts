import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestService = 0;
  private spinnerService = inject(NgxSpinnerService);

  busy() {
    this.busyRequestService++;
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333',
      type: 'ball-triangle-path',
    });
  }

  idle() {
    this.busyRequestService--;
    if (this.busyRequestService <= 0) {
      this.busyRequestService = 0;
      this.spinnerService.hide();
    }
  }
}
