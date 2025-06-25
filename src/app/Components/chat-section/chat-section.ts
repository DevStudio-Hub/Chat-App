import { CommonModule } from '@angular/common';
import { Component,  ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-section.html',
  styleUrl: './chat-section.css'
})
export class ChatSection  implements AfterViewInit{
   messages = [
    { text: 'Hello! How are you?', type: 'received' },
    { text: "I’m good, thanks!", type: 'sent' }
  ];

  newMessage: string = '';

  @ViewChild('chatInput') chatInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.focusInput();
  }

  focusInput() {
    setTimeout(() => this.chatInput?.nativeElement.focus(), 0);
  }

  sendMessage() {
    const message = this.newMessage.trim();
    if (message !== '') {
      this.messages.push({ text: message, type: 'sent' });
      this.newMessage = '';
      this.focusInput();
    }
  }
}
