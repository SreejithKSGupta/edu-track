import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private router: Router, private cookieService: CookieService) {}

  onSubmit() {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.login();
    }
  }

  private login() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      storedUser.username === this.username &&
      storedUser.password === this.password
    ) {
      this.errorMessage = '';
      console.log('Login successful');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  private signup() {
    if (this.password === this.confirmPassword) {
      const encryptedUsername = CryptoJS.AES.encrypt(
        this.username,
        'your-secret-key'
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        this.password,
        'your-secret-key'
      ).toString();
      this.cookieService.set('username', encryptedUsername);
      this.cookieService.set('password', encryptedPassword);
      const userData = {
        username: this.username,
        password: this.password,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('Account created:', this.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = ''; // Clear error message when toggling
  }
}
