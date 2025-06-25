import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {
  constructor(private router: Router) { }

  list = [
    {
      profilePic:"arman.jpeg",
      name: "Arman"

    },
    {
      profilePic:"ayushi.jpeg",
      name: "Ayushi"

    },
    {
      profilePic:"arman.jpeg",
      name: "Rhul"

    },
    {
      profilePic:"ayushi.jpeg",
      name: "Puja"

    },
  ]

  selectUser(user: any) {
    this.router.navigate(['/dashboard/userProfile', user.name] );
  }

}
