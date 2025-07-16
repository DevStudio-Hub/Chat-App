import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../Components/sidebar/sidebar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    const userString = localStorage.getItem('isLogin');
    const isLogin = userString ? JSON.parse(userString) : false;
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
