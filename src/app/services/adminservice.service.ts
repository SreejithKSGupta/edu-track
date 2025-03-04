import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  private url = 'http://localhost:5000/users';

  private userId = signal<string | null>(null);
  private username = signal<string | null>(null);

  // ✅ Computed signal for authentication status
  isAuthenticated = computed(() => this.username() !== null);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loadUserFromCookies();
  }

  addUser(user: any): Observable<any> {
    return this.http.post('http://localhost:5000/create-user', user);
  }

  checksignin(user: any): Observable<any> {
    return this.http.post('http://localhost:5000/users', user);
  }

  getuserid(): string | null {
    return this.userId();
  }

  private loadUserFromCookies() {
    const encryptedUserId = this.cookieService.get('user_id');
    const encryptedUsername = this.cookieService.get('username');

    if (encryptedUserId) {
      const decryptedUserId = CryptoJS.AES.decrypt(
        encryptedUserId,
        'your-secret-key'
      ).toString(CryptoJS.enc.Utf8);
      this.userId.set(decryptedUserId);
    }

    if (encryptedUsername) {
      const decryptedUsername = CryptoJS.AES.decrypt(
        encryptedUsername,
        'your-secret-key'
      ).toString(CryptoJS.enc.Utf8);
      this.username.set(decryptedUsername);
    }
  }

  // ✅ Moved from SigninComponent: Set user cookies & signals
  setUserCookie(userId: string, username: string) {
    const encryptedUsername = CryptoJS.AES.encrypt(username, 'your-secret-key').toString();
    const encryptedUserID = CryptoJS.AES.encrypt(userId, 'your-secret-key').toString();

    this.cookieService.set('username', encryptedUsername);
    this.cookieService.set('user_id', encryptedUserID);

    this.userId.set(userId);
    this.username.set(username);

  }

  logout() {
    this.cookieService.delete('user_id');
    this.cookieService.delete('username');

    this.userId.set(null);
    this.username.set(null);
  }
}
