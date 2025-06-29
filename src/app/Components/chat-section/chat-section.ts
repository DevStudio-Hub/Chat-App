import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-section.html',
  styleUrl: './chat-section.css',
})
export class ChatSection implements AfterViewInit, OnInit {
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}
  UserProfileName: string = '';
  
  
  userChat: any;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('ChatId');
      if (userId) {
        this.userChat = this.chatService.checkData(userId)
        this.UserProfileName = userId;
      
      }
    });
  }
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
    if (!message) return;

    let user = this.chatService.checkData(this.UserProfileName);

    if (!user) {
     
      user = {
        username: this.UserProfileName,
        messages: [],
      };
      this.chatService.getUsersData().push(user);
    }

    user.messages.push({ text: message, type: 'send' });
    this.userChat = user;
    this.newMessage = '';
    this.focusInput();
  }
  }

  
