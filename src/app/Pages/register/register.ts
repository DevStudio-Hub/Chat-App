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
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)],
      age: [Validators.required],
      gender: ['', Validators.required, Validators],
      otp: ['', Validators.required],
    });
  }

  nextStep() {
    this.step++;
  }

  handleRegister() {
    const payload = this.registerForm.value;

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
      username: this.registerForm.get('email')?.value,
      otp: this.registerForm.get('otp')?.value,
    };

    this.http
      .post('http://localhost:3000/api/auth/otpverifyde', otpPayload, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          if (res.success) {
            alert('OTP Verified Successfully');
            this.router.navigate(['/dashboard/home']);
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
