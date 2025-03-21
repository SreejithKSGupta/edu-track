import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AdminserviceService } from '../../services/adminservice.service';
import { User } from '../../models/user.model';

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
export class SigninComponent implements OnInit {
  username: string = '';
  password: string = '';
  user_id: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSignUp: boolean = false;

  constructor(private router: Router, private adminService: AdminserviceService) {
    console.log("came to sign in");
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (this.adminService.isAuthenticated()) {
        const choice = confirm('You are already logged in. Do you want to log out?');
        if (choice) {
          this.adminService.logout();
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    }
  }

  onSubmit(): void {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.login();
    }
  }

  private login(): void {
    const user = {
      username: this.username,
      password: this.password,
      name: this.username,
    };

    this.adminService.checksignin(user).subscribe((response: {message:string, user:User}) => {
      console.log(response, typeof response)
      if (response && response.user && response.user._id) {
        this.user_id = response.user._id;

        if (response) {
          this.adminService.setUserCookie(this.user_id, this.username);
          this.router.navigate(['/dashboard']);
        }
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  private signup(): void {
    if (this.password === this.confirmPassword) {
      const userData = {
        username: this.username,
        password: this.password,
        name: this.username,
      };

      this.adminService.addUser(userData).subscribe((res) => {
        const userID = res._id;
        if (res && userID && res.username) {
          this.adminService.setUserCookie(userID, res.username);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Signup failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }
}
