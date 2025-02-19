import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSignUp: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.isSignUp) {
      if (this.password === this.confirmPassword) {
        console.log('Account created:', this.username);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Passwords do not match';
      }
    } else {
      if (this.username === 'admin' && this.password === 'password') {
        this.errorMessage = '';
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = ''; // Clear error message when toggling
  }
}
