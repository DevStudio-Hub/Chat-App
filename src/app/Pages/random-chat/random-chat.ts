import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-random-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './random-chat.html',
  styleUrls: ['./random-chat.css'],
})
export class RandomChatComponent implements OnInit, OnDestroy {
  messages: { from: string; text: string }[] = [];
  inputText = '';
  matched = false;
  disconnected = false;
  confirmLeave = false;
  chatEnded = false;

  private socket!: Socket;

  ngOnInit(): void {
    this.connectSocket();
  }

  ngOnDestroy(): void {
    this.disconnectSocket();
  }

  connectSocket(): void {
    this.socket = io('http://localhost:3001');

    this.socket.on('waiting', () => {
      this.matched = false;
      this.disconnected = false;
      this.chatEnded = false;
      this.confirmLeave = false;
      this.messages = [{ from: 'system', text: 'Waiting for a stranger...' }];
    });

    this.socket.on('matched', () => {
      this.matched = true;
      this.disconnected = false;
      this.confirmLeave = false;
      this.messages.push({
        from: 'system',
        text: 'Stranger connected. Say hi!',
      });
    });

    this.socket.on('message', (data: { from: string; text: string }) => {
      this.messages.push({ from: 'stranger', text: data.text });
    });

    this.socket.on('stranger-disconnected', () => {
      this.matched = false;
      this.disconnected = true;
      this.chatEnded = true;
      this.messages.push({
        from: 'system',
        text: 'Stranger disconnected.',
      });
    });
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(): void {
    if (!this.inputText.trim()) return;

    this.socket.emit('message', this.inputText);
    this.messages.push({ from: 'you', text: this.inputText });
    this.inputText = '';
  }

  leaveChat() {
    if (this.chatEnded) {
      this.messages = [];
      this.chatEnded = false;
      this.confirmLeave = false;
      this.connectSocket();
      return;
    }

    if (!this.confirmLeave) {
      this.confirmLeave = true;
      return;
    }

    this.socket.emit('leave');
    this.messages.push({ from: 'system', text: 'You left the chat.' });
    this.disconnectSocket();
    this.matched = false;
    this.disconnected = true;
    this.chatEnded = true;
    this.confirmLeave = false;
  }
}
