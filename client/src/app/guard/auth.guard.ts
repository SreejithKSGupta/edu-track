import { Injectable } from '@angular/core';
import {  CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthserviceService) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.isLoading$.next(true);

      setTimeout(() => {
        const isAuthenticated = this.authService.isAuthenticated();

        if (!isAuthenticated) {
          this.router.navigate(['/signin'], { replaceUrl: true });
        }

        this.isLoading$.next(false);


        resolve(isAuthenticated);
      }, 200);
    });
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
}
