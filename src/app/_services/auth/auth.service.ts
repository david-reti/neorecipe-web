import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BACKEND_URLS } from 'src/app/urls';
import { tap, Observable, of, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: String = "";
  userID : Number = 1;
  skipCalls: string[] = ['login', 'reset-password'];
  currentlySignedIn: Boolean = false;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { 
    this.token = window.sessionStorage['token'];
    this.currentlySignedIn = this.token ? true : false;
  }

  login(username: string, password: string) {
    return this.http.post(BACKEND_URLS.LOGIN, {username: username, password: password}).pipe(
      catchError((error, _) => this.handleAuthError("signin", error)),
    ).subscribe(body => {
      this.currentlySignedIn = true;
      this.token = body.auth_token;
      window.sessionStorage['token'] = this.token;
      this.router.navigateByUrl('dashboard');
    });
  }

  logout() {
    this.http.post(BACKEND_URLS.LOGOUT, this.token).pipe(
      catchError((error, _) => this.handleAuthError("signout", error)),
    ).subscribe(_ => {
      this.signedOut();
      this.router.navigateByUrl('home');
    })
  }

  signedOut() {
    this.token = "";
    this.currentlySignedIn = false;
    window.sessionStorage['token'] = '';
  }

  signup(username: string, email: string, password: string, passwordConfirmation: string) {
    return this.http.post(BACKEND_URLS.SIGNUP, {username: username, email: email, password: password, re_password: passwordConfirmation}).pipe(
      catchError((error, _) => this.handleAuthError("signup", error))
    );
  }

  private handleAuthError(action: String, error: HttpErrorResponse) : Observable<any> {
    if(error.status === 0) {
      this.messageService.sendLongError(`Oops! There was an error during ${action}`, `An error occured when attempting ${action} - it happened on your end, so check if you have a stable internet connection and try again.`);
    } else {
      if(error.error.non_field_errors) {
        this.messageService.sendLongError(`${action} error`, error.error.non_field_errors.join(','));
      }
      else {
        this.messageService.sendLongError(`${action} error`, `An error occured when attempting ${action}: ${error.status} (${error.statusText})`);
      }
    }
    return of();
  }
}
