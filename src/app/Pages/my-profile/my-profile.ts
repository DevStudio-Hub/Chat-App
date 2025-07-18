import { Logo } from './../logo/logo';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from '../../services/chat-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile implements OnInit {
  constructor(private chatservice: ChatService, private router: Router) {}
  userData: any = null;
  loading: boolean = true;
  editMode: boolean = false;

  ngOnInit(): void {
    const userDtail = localStorage.getItem('user');
    if (userDtail) {
      this.userData = JSON.parse(userDtail);
      this.loading = false;
    }
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    const oldUser = JSON.parse(localStorage.getItem('user') || '{}');
    const apiData = {
      fullname: this.userData.fullname,
      Age: this.userData.Age,
      address: this.userData.address,
      bio: this.userData.bio,
    };
    this.chatservice.updateBio(apiData).subscribe({
      next: (res: any) => {
        console.log('Bio updated successfully:', res.data);
      },
      error: (err) => {
        console.log('Error updating bio:', err);
      },
    });

    const updatedUser = {
      ...oldUser,
      fullname: this.userData.fullname,
      Age: this.userData.Age,
      address: this.userData.address,
      bio: this.userData.bio,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    console.log('Profile saved:', updatedUser);

    this.editMode = false;
  }

  logout(): void {
    this.chatservice.logOutUser().subscribe({
      next: (data: any) => {
        if (data.isLogOut) {
          localStorage.clear()
          this.router.navigate(['/login'])

        }
        
      },
      error: (err) => {
        console.log(err.error)
      }
    });
  }
}
