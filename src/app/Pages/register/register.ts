import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from './../../services/chat-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createLinkedSignal } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  step = 1;
  constructor(
    private chatService: ChatService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      Age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      otp: ['', [Validators.required]],
    });
  }

  nextStep() {
    this.step++;
  }

  handleRegister() {
    const payload = this.registerForm.value;

    this.chatService.registerUser(payload).subscribe({
      next: (res: any) => {
        console.log('Registration successful. OTP sent.', res);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('isLogin', JSON.stringify(res.isLogin));

        this.step = 3;
      },
      error: (err) => {
        console.error('Register error', err);
        if (err.error) {
          console.log(err.error);
        } else {
          alert('Server error during registration.');
        }
      },
    });
  }

  verifyOtp() {
    const otpPayload = {
      username: this.registerForm.get('username')?.value,
      otp: this.registerForm.get('otp')?.value,
    };

    this.http
      .post('http://localhost:3000/auth/otpVerify', otpPayload, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          alert('OTP Verified Successfully');
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          console.error('Register error', err);
          if (err.error) {
            console.log(err.error);
          } else {
            alert('Server error during registration.');
          }
        },
      });
  }
}
