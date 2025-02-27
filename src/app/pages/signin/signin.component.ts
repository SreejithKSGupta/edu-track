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
  user_id: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isSignUp: boolean = false;

  constructor(
    private router: Router,
     private cookieService: CookieService,
     private adminService: AdminserviceService
    ) {}

    ngOnInit(): void {
      if (typeof window !== 'undefined') {
        const encryptedUsername = this.cookieService.get('username');
        if (encryptedUsername) {
          let choise = confirm('You are already logged in. Do you want to log out?');
          if(choise){
            this.cookieService.delete('username');
            this.cookieService.delete('password');
          }
          else{
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
    const user={
      username:this.username,
      password:this.password,
      name:this.username
    }
   this.adminService.checksignin(user).subscribe(
    (response) => {
      console.log(response);
      this.user_id= response.user._id;
      debugger
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
    console.log(this.user_id);
    debugger
    const encryptedUsername = CryptoJS.AES.encrypt(
      this.username,
      'your-secret-key'
    ).toString();
    const encryptedUserID = CryptoJS.AES.encrypt(
      this.user_id,
      'your-secret-key'
    ).toString();

    this.cookieService.set('username', encryptedUsername);
    this.cookieService.set('user_id', encryptedUserID);

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
    this.adminService.addUser(userData).subscribe(res=>{
      console.log(res);
    });
  }

}


