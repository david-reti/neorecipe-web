import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import ValiateAgainstBadWords from '../_util/badWordValidator';
import NoSpecialCharacterValidator from '../_util/noSpecialCharacerValidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  form!: FormGroup;
  errorMessage: String = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64), NoSpecialCharacterValidator(), ValiateAgainstBadWords()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  attemptLogin(formGroup: FormGroup) {
    this.loading = true;
    this.authService.login(formGroup.get('username')?.value, formGroup.get('password')?.value).add(() => {
      this.loading = false;
    });
  }
}
