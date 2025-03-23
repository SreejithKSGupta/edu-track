import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';
import { User } from '../models/user.model';
import { environment } from '../../environment/environment';


interface MiniUser {
  _id?: string;
  username: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  private readonly url = environment.apiUrl;

  private userId = signal<string | null>(null);
  private username = signal<string | null>(null);

  isAuthenticated = computed(() => this.username() !== null);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loadUserFromCookies();
  }

    _id: any;

  addUser(user:MiniUser): Observable<MiniUser> {
    return this.http.post(`${this.url}/create-user`, user) as unknown as Observable<MiniUser>;
  }

  checksignin(user: MiniUser): Observable<{message:string, user:User}> {
    return this.http.post(`${this.url}/users`, user) as unknown as Observable<{message:string, user:User}>;
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
