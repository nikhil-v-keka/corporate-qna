import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
})
export class SessionTimeoutComponent {
  constructor(
    private bsModalRef: BsModalRef,
    private route: Router,
    ){ }

  sessionExpired() {
    localStorage.removeItem('token')
    this.route.navigate(['/login']);
    this.onClose();
  }
  
  onClose() {
    this.bsModalRef.hide();
  }

}
