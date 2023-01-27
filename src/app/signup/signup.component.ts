import { Component } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import FieldMatchValidator from '../_util/fieldMatchValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
    }, { 'validator': FieldMatchValidator('password', 'passwordConfirmation')});
  }

  attemptSignup() {
    this.authService.signup(this.form.get('username')?.value,
                            this.form.get('email')?.value, 
                            this.form.get('password')?.value, 
                            this.form.get('passwordConfirmation')?.value).subscribe(value => {
                              this.router.navigateByUrl('/activate');
                            });
  }
} 
