import { Injectable } from '@angular/core';
import { Message } from './model'
 
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  fileMessages: any[] = []; 
 
  add(message: Message) {
    this.messages.push(message);
  }

  remove(message: Message) {
    for( var i = 0; i < this.messages.length; i++){ 
      if ( this.messages[i] === message) {
        this.messages.splice(i, 1); 
      }
   }
  }

  addFileMessage(message: any) {
    let fileId: number = this.fileMessages.findIndex(h => h.name == message.name);
    if(fileId === -1) {
      this.fileMessages.push(message); 
    } else {
      this.fileMessages[fileId] = message; 
    }
    
  }

  removeFileMessage(name: any) {
    let fileId: number = this.fileMessages.findIndex(h => h.name == name);
    if(fileId != -1) {
      this.fileMessages.splice(fileId, 1); 
    }
  }
 
  clear() {
    this.messages = [];
  }
}
