import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-profilebutton',
  templateUrl: './profilebutton.component.html',
  styleUrls: ['./profilebutton.component.scss']
})
export class ProfilebuttonComponent {
  constructor(protected auth: AuthService, protected router: Router) {}
}
