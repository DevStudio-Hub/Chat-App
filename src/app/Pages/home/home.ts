import { Component } from '@angular/core';
import { Sidebar } from '../../Components/sidebar/sidebar';
import { UsersChat } from '../../Components/users-chat/users-chat';
import { ChatSection } from '../../Components/chat-section/chat-section';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ UsersChat,RouterOutlet,],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
