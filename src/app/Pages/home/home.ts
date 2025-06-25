import { Component } from '@angular/core';
import { Sidebar } from '../../Components/sidebar/sidebar';
import { UsersChat } from '../../Components/users-chat/users-chat';
import { ChatSection } from '../../Components/chat-section/chat-section';

@Component({
  selector: 'app-home',
  imports: [ UsersChat, ChatSection,],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
