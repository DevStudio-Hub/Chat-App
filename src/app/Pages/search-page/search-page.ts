import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  constructor(private router: Router, private chatService: ChatService) {}

  searchQuery = '';
  searchResults: any = [];

  onSearch() {
    if (this.searchQuery.trim().length < 2) {
      this.searchResults = [];
      return;
    }
    this.chatService.searchUser(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = results;
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }

  selectUser(user: any) {
    console.log(user)
    this.router.navigate(['/dashboard/userProfile', user._id]);
  }
}
