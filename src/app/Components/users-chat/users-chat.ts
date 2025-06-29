import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChatService } from '../../services/chat-service';



@Component({
  selector: 'app-users-chat',
  imports: [NgClass, CommonModule,],
  templateUrl: './users-chat.html',
  styleUrl: './users-chat.css'
})
export class UsersChat implements OnInit{
  constructor(private router: Router, private chatService: ChatService) {}
  users: any;
  ngOnInit() {
     this.users = this.chatService.getUsers(); 
  }
  

  handleChatUser(userName: string) {
    this.router.navigate(['/dashboard/home/Chat', userName]);
  }

}
