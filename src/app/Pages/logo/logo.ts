import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css'
})
export class Logo {
  constructor(private router: Router){}
  handlePageButton(){
    this.router.navigate(['/home'])
  }
}
