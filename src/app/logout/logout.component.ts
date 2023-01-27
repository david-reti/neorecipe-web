import { Component } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <div>
      <app-longerroroutlet></app-longerroroutlet>
    </div>
  `,
  styles: [
  ]
})
export class LogoutComponent {
  
  constructor(private auth: AuthService) {}
  
  ngOnInit() {
    this.auth.logout();
  }
}
