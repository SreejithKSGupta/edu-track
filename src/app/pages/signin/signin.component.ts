import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
  user_id: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSignUp: boolean = false;

  constructor(private router: Router, private adminService: AdminserviceService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (this.adminService.isAuthenticated()) {
        let choice = confirm('You are already logged in. Do you want to log out?');
        if (choice) {
          this.adminService.logout();
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    }
  }

  onSubmit() {
    if (this.isSignUp) {
      this.signup();
    } else {
      this.login();
    }
  }

  private login() {
    const user = {
      username: this.username,
      password: this.password,
      name: this.username,
    };

    this.adminService.checksignin(user).subscribe((response) => {
      console.log(response);
      this.user_id = response.user._id;

      if (response) {
        // ✅ Call AdminserviceService to set user session
        this.adminService.setUserCookie(this.user_id, this.username);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  private signup() {
    if (this.password === this.confirmPassword) {
      const userData = {
        username: this.username,
        password: this.password,
        name: this.username,
      };

      this.adminService.addUser(userData).subscribe((res) => {
        console.log(res);
        // ✅ Call AdminserviceService to set user session after signup
        this.adminService.setUserCookie(res.user._id, this.username);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }
}
