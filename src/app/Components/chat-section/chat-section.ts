import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-section.html',
  styleUrls: ['./chat-section.css'],
})
export class ChatSection implements AfterViewInit, OnInit, OnDestroy {
  UserProfileName = '';
  userProfilePic = '';
  userData = JSON.parse(localStorage.getItem('user') || '{}');
  currentUserId = this.userData._id;
  roomId = '';

  messages: any = [];

  private shouldScrollBottom = false;

  newMessage = '';
  @ViewChild('scrollContainer')
  private scrollContainer!: ElementRef<HTMLDivElement>;

  @ViewChild('chatInput') chatInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('Id');
      if (userId) {
        this.chatService.getUserInfo(userId).subscribe({
          next: (data: any) => {
            this.UserProfileName = data.username;
            this.userProfilePic = data.profileURL;
            this.roomId = [this.currentUserId, data._id].sort().join('_');

            this.chatService.joinRoom(this.roomId);

            this.chatService.clearUnReadCount(this.roomId);

            this.chatService.getMessages(this.roomId).subscribe((msgs: any) => {
              this.messages = msgs.map((m: any) => ({
                text: m.text,
                sender:
                  String(m.sender && m.sender._id ? m.sender._id : m.sender) ===
                  String(this.currentUserId)
                    ? 'send'
                    : 'receive',
                sentAt: m.sentAt,
              }));
              this.shouldScrollBottom = true;
            });

            this.chatService.onMessage((data: any) => {
              this.messages.push({
                text: data.text,
                sender:
                  String(data.sender) === String(this.currentUserId)
                    ? 'send'
                    : 'receive',
                sentAt: data.sentAt,
              });
              this.shouldScrollBottom = this.isUserNearBottom();
            });
          },
          error: (error) => {
            console.error('Error fetching user info:', error);
          },
        });
      }
    });
  }

  private scrollToBottom(): void {
    const el = this.scrollContainer?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  private isUserNearBottom(): boolean {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return true;
    const threshold = 100;
    return el.scrollTop + el.clientHeight > el.scrollHeight - threshold;
  }

  ngOnDestroy() {
    this.chatService.removeMessageListener();
  }
  ngAfterViewInit() {
    this.focusInput();
    setTimeout(() => this.scrollToBottom(), 0);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollBottom) {
      this.scrollToBottom();
      this.shouldScrollBottom = false;
    }
  }

  focusInput() {
    setTimeout(() => this.chatInput?.nativeElement.focus(), 0);
  }

  sendMessage() {
    const text = this.newMessage.trim();
    if (!text) return;
    this.chatService.sendMessage(this.roomId, text, this.UserProfileName);

    this.newMessage = '';
    this.focusInput();
  }
}
