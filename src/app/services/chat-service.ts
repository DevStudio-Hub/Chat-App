import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}
  users = [
    {
      id: 1,
      name: 'Arman',
      profilePic: 'arman.jpeg',
      online: true,
      lastSeen: '2 min ago',
      lastMessage: 'Hey!',
      unreadCount: 3,
    },
    {
      id: 2,
      name: 'Ayushi',
      profilePic: 'ayushi.jpeg',
      online: false,
      lastSeen: '5 min ago',
      lastMessage: "What's up?",
      unreadCount: 0,
    },
    {
      id: 3,
      name: 'Ravi',
      profilePic: 'arman.jpeg',
      online: true,
      lastSeen: 'Online',
      lastMessage: "Let's meet",
      unreadCount: 1,
    },
    {
      id: 4,
      name: 'Sneha',
      profilePic: 'ayushi.jpeg',
      online: false,
      lastSeen: '10 min ago',
      lastMessage: 'See you soon',
      unreadCount: 0,
    },
    {
      id: 5,
      name: 'Kabir',
      profilePic: 'arman.jpeg',
      online: true,
      lastSeen: 'Online',
      lastMessage: 'Cool!',
      unreadCount: 5,
    },
    {
      id: 6,
      name: 'Simran',
      profilePic: 'ayushi.jpeg',
      online: false,
      lastSeen: '20 min ago',
      lastMessage: 'Busy right now',
      unreadCount: 2,
    },
    {
      id: 7,
      name: 'Ayaan',
      profilePic: 'arman.jpeg',
      online: true,
      lastSeen: 'Online',
      lastMessage: 'Got it',
      unreadCount: 0,
    },
  ];
  

  getUsers() {
    return this.users;
  }
  getUserByName(name: string) {
    return this.users.find(u => u.name === name);
  }

  addUser(name: any) {
    let user = this.getUserByName(name);
    if (!user) {
      const newUser = {
        id: Date.now(), 
        name: name,
        profilePic: 'default.jpeg',
        online: true,
        lastSeen: 'Just now',
        lastMessage: '',
        unreadCount: 0
      };
      this.users.push(newUser);
      user = newUser;
      console.log("New user added:", newUser);
    }
    
  }

usersData = [
    {
      username: 'Arman',
      messages: [
        { text: 'Hello, I am Arman. How are you?', type: 'received' },
        { text: 'I am good, Arman!', type: 'send' },
      ],
    },
    {
      username: 'Ayushi',
      messages: [
        { text: 'Hi, Ayushi here. Long time!', type: 'received' },
        { text: 'Yeah! How have you been?', type: 'send' },
      ],
    },
    {
      username: 'Ravi',
      messages: [
        { text: 'Hey! Ravi speaking.', type: 'received' },
        { text: 'Hi Ravi, all good?', type: 'send' },
      ],
    },
    {
      username: 'Sneha',
      messages: [
        { text: 'Hi, Sneha this side.', type: 'received' },
        { text: 'Hey Sneha, nice to hear from you!', type: 'send' },
      ],
    },
    {
      username: 'Kabir',
      messages: [
        { text: 'Kabir here. Wassup?', type: 'received' },
        { text: 'All good Kabir, you tell!', type: 'send' },
      ],
    },
    {
      username: 'Simran',
      messages: [
        { text: 'Hey! This is Simran.', type: 'received' },
        { text: 'Hi Simran, what’s up?', type: 'send' },
      ],
    },
    {
      username: 'Ayaan',
      messages: [
        { text: 'Hi! Ayaan here.', type: 'received' },
        { text: 'Hello Ayaan, how are you?', type: 'send' },
      ],
    },
  ];


  getUsersData(){
  return this.usersData
  }
  checkData(username: string) {
    return this.usersData.find((u) => u.username === username);
  }

}
