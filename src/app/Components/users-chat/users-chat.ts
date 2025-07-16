import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-users-chat',
  imports: [NgClass, CommonModule],
  templateUrl: './users-chat.html',
  styleUrl: './users-chat.css',
})
export class UsersChat implements OnInit {
  constructor(private router: Router, private chatService: ChatService) {}

  currentUserId = JSON.parse(localStorage.getItem('user') || '{}')._id;
  users: any = [];

  ngOnInit() {
    this.fetchRooms();
    this.chatService.onRoomsUpdated(() => {
      this.fetchRooms();
    });
  }
  fetchRooms() {
    this.chatService.getRooms().subscribe({
      next: (rooms: any) => {
        this.users = rooms.map((room: any) => {
          const other = room.participants.find(
            (p: any) => p.user !== this.currentUserId
          );
          return {
            roomId: room.roomId,
            userId: other.user,
            username: other.username,
            userProfile: other.userProfile,
            lastMessage: room.lastMessage?.text || '',
            lastSeen: room.updatedAt,
            unreadCount: other.unreadCount,
          };
        });
        
      },

      error: (err) => {
        console.error('Register error', err);
        if (err.error) {
          console.log(err.error);
        } else {
          alert('Server error during registration.');
        }
      },
    });
  }

  handleChatUser(username: string) {
    
    this.router.navigate(['/dashboard/home/Chat', username]);
  }
}
