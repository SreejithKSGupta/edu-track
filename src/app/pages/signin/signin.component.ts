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
import { AdminserviceService } from '../../services/adminservice.service';

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

  constructor(
    private router: Router,
     private cookieService: CookieService,
     private adminService: AdminserviceService
    ) {}

  onSubmit() {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.login();
    }
  }

  private login() {
    const user={
      username:this.username,
      password:this.password
    }
   this.adminService.checksignin(user).subscribe(
    (response) => {
      console.log(response);
      if (response) {
        this.setUserCookie();
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    })

    // else {
    //   this.errorMessage = 'Invalid username or password';
    // }
  }


  private setUserCookie() {
    const encryptedUsername = CryptoJS.AES.encrypt(
      this.username,
      'your-secret-key'
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      this.password,
      'your-secret-key'
    ).toString();

    // Store encrypted data in cookies
    this.cookieService.set('username', encryptedUsername);
    this.cookieService.set('password', encryptedPassword);

    console.log('Login successful');
  }

  private signup() {
    if (this.password === this.confirmPassword) {
      this.setUserCookie();
      const userData = {
        username: this.username,
        password: this.password,
        name: this.username,

      };
      this.savaNewUser(userData);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = ''; // Clear error message when toggling
  }

  private savaNewUser(userData: { username: string; password: string; name:string }) {
    this.adminService.addUser(userData);
  }

}


