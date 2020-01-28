import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../model'; 

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    
  }

  onClosed(message: Message): void {
    this.messageService.remove(message);
  }

}
