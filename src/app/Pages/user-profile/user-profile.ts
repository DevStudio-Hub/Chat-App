import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  userData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.userData = this.getUserData(userId);
    }
    console.log('userId:', userId);
  }

  getUserData(userId: string) {
    const users = [
      {
        id: '1',
        name: 'Arman',
        age: 25,
        profilePic: 'arman.jpeg',
        bio: 'A passionate software developer who loves building scalable web applications and exploring new technologies.',
        email: 'arman.dev@example.com',
        location: 'Mumbai, India',
        joined: 'Jan 2021',
      },
      {
        id: '2',
        name: 'Ayushi',
        age: 30,
        profilePic: 'ayushi.jpeg',
        bio: 'Creative UI/UX designer with a knack for making beautiful and user-friendly designs.',
        email: 'ayushi.design@example.com',
        location: 'Delhi, India',
        joined: 'March 2020',
      },
      {
        id: '3',
        name: 'Rhul',
        age: 28,
        profilePic: 'arman.jpeg',
        bio: 'Full-stack engineer with a strong background in backend systems and cloud infrastructure.',
        email: 'rhul.engineer@example.com',
        location: 'Bangalore, India',
        joined: 'July 2019',
      },
      {
        id: '4',
        name: 'Puja',
        age: 22,
        profilePic: 'ayushi.jpeg',
        bio: 'Aspiring digital marketer with a focus on content creation and brand strategy.',
        email: 'puja.marketing@example.com',
        location: 'Kolkata, India',
        joined: 'Oct 2022',
      },
    ];

    return users.find((user) => user.name === userId);
  }
  handleMessege(userName: string) {
    this.chatService.addUser(userName);
    this.router.navigate(['/dashboard/home/Chat', userName]);
  }
}
