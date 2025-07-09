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
      console.log('Rooms updated - fetching again...');
      this.fetchRooms();
    });
  }
  fetchRooms() {
    this.chatService.getRooms().subscribe((rooms: any) => {
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
      console.log('Users List:', this.users);
    });
  }

  handleChatUser(username: string) {
    console.log(username)
    this.router.navigate(['/dashboard/home/Chat', username]);
  }
}
