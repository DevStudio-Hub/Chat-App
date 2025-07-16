import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile implements OnInit {
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.chatService.getUserInfo(userId).subscribe({
        next: (data) => {
          this.userData = data;
        },
        error: (error) => {
          console.error('Error fetching user info:', error);
          if (error.error) {
            console.log(error.error);
          } else {
            alert('Error fetching user info:');
          }
        },
      });
    }
  }

  handleMessege(_id: string) {
    this.router.navigate(['/dashboard/home/Chat', _id]);
  }
}
