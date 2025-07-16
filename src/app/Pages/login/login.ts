import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private service: ChatService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginSubmit() {
    const payload = this.loginForm.value;
    this.service.loginUser(payload).subscribe({
      next: (res: any) => {
        if (res.success) {
          
          console.log('res data', res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
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
}
