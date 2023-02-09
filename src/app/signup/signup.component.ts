import { Component } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import ValiateAgainstBadWords from '../_util/badWordValidator';
import FieldMatchValidator from '../_util/fieldMatchValidator';
import NoSpecialCharacterValidator from '../_util/noSpecialCharacerValidator';
import NotContainsValidator from '../_util/notContainsValidator';
import ValidateNotNumeric from '../_util/notNumericValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64), NoSpecialCharacterValidator(), ValiateAgainstBadWords()]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), ValidateNotNumeric()]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(8), ValidateNotNumeric()]],
    }, { 'validator': FieldMatchValidator('password', 'passwordConfirmation') });
  }

  attemptSignup() {
    this.loading = true;
    this.authService.signup(this.form.get('username')?.value,
                            this.form.get('email')?.value, 
                            this.form.get('password')?.value, 
                            this.form.get('passwordConfirmation')?.value).subscribe(value => {
                              this.router.navigateByUrl('/activate');
                            }).add(() => {
                              this.loading = false;
                            });
  }
} 
