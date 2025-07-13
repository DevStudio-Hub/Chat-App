import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../Components/sidebar/sidebar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar,RouterOutlet,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
constructor(private router: Router){}
ngOnInit() {
    const user = localStorage.getItem("user")
    if(!user){
      this.router.navigate((["/login"]))
    }
}

}
