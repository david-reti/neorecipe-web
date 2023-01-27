import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages$: Subject<any> = new BehaviorSubject(null);

  constructor(private router: Router) { }

  getMessages() {
    return this.messages$.asObservable();
  }

  sendInfo(message: String) {
    this.messages$.next({messageType: 'info', content: message});
  }

  sendWarning(message: String) {
    this.messages$.next({messageType: 'warning', content: message});
  }

  sendError(message: String) {
    this.messages$.next({messageType: 'error', content: message});
  }

  sendLongError(message: String, longVersion: String) {
    this.messages$.next({messageType: 'error', content: message, longVersion: longVersion});
  }
}
