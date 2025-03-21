import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  // Add behavior subject to track authentication state
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private cookie: CookieService) {
    // Initialize authentication state
    this.checkAuthState();
  }

  private checkAuthState(): void {
    const isAuth = !!this.cookie.get('user_id');
    this.isAuthenticated$.next(isAuth);
  }

  isAuthenticated(): boolean {
    this.checkAuthState(); // Refresh auth state
    return this.isAuthenticated$.getValue();
  }
}
