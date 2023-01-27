import { Component } from '@angular/core';
import { ActivationEnd, EventType, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, last, Observable, of, Subscription } from 'rxjs';
import Message from '../_models/Message';
import { AuthService } from '../_services/auth/auth.service';
import { MessageService } from '../_services/message/message.service';

@Component({
  selector: 'app-longerroroutlet',
  templateUrl: './longerroroutlet.component.html',
  styleUrls: ['./longerroroutlet.component.scss']
})
export class LongerroroutletComponent {
  toDisplay: Message | null = null;
  messages$: Subscription | null = null;

  ngOnInit() {
    this.messages$ = this.messageService.getMessages().pipe(
      filter(message => message && message.longVersion?.length > 0 ),
    ).subscribe(value => {
      this.toDisplay = value;
    });
  }

  constructor(private messageService : MessageService, private router : Router) {}
}
