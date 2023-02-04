import { Component } from '@angular/core';
import { delay, Observable, of, Subscription } from 'rxjs';
import Message from '../_models/Message';
import { MessageService } from '../_services/message/message.service';
import { state, group, style, transition, animate, trigger, sequence } from '@angular/animations';

@Component({
  selector: 'app-messagedisplay',
  templateUrl: './messagedisplay.component.html',
  styleUrls: ['./messagedisplay.component.scss'],
  animations: [
    trigger('messageDisplay', [
      state('*', style({ marginTop: '3rem' })),
      transition(':enter', [
        style({marginTop: '-3rem'}),
        animate(200, style({marginTop: '3rem'})),
      ]),
      transition(':leave', [
        animate(500, style({marginLeft: '200vw', opacity: 0}))
      ])
    ])
  ]
})
export class MessagedisplayComponent {
  message: Message | null = null;
  messages$: Subscription = new Subscription();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messages$ = this.messageService.getMessages().subscribe(newMessage => {
      this.message = newMessage;
      setTimeout(() => {
        this.hideMessage();
      }, 8000);
    });
  }

  hideMessage() {
    this.message = null;
  }

  ngOnDestroy() {
    this.messages$.unsubscribe();
  }
}
