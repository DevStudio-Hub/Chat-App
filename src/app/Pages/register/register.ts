import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './../../services/chat-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  step = 1;
  constructor(private chatService: ChatService, private http: HttpClient, private router:Router) {}

  formData: any = {
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    DOB: '',
    otp: '',
  };

  nextStep() {
    this.step++;
  }

  handleRegister() {
    const payload = {
      username: this.formData.username,
      email: this.formData.email,
      password: this.formData.password,
      gender: this.formData.gender,
      Age: this.formData.age, // Assuming `age` is treated as DOB input (or you can use Date selector)
    };

    this.chatService.registerUser(payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          console.log('Registration successful. OTP sent.');
          console.log('res data', res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          this.step = 3;
        } else {
          alert(res.mess || 'Registration failed.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Server error during registration.');
      },
    });
  }

  verifyOtp() {
    const otpPayload = {
      username: this.formData.username,
      otp: this.formData.otp,
    };

    this.http
      .post('http://localhost:3000/api/auth/otpverifyde', otpPayload, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            alert('OTP Verified Successfully');
            this.router.navigate(["/dashboard/home"])
          } else {
            alert(res.message || 'OTP verification failed.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Error verifying OTP');
        },
      });
  }
}
