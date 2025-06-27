import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
step = 1;

formData = {
  username: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  otp: ''
};

nextStep() {
  this.step++;
}
submitForm(){
  console.log("Submitted data:",this.formData);
}
}
