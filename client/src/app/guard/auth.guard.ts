import { Injectable } from '@angular/core';
import {  CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  constructor(private router: Router, private cookie: CookieService) {}

  canActivate(): boolean {
    if (this.cookie.get('user_id')) {
      return true;
    }else{
      this.router.navigate(['signin'])
      return false;
    }
  }

  canActivateChild(): MaybeAsync<GuardResult> {
    return this.canActivate();
  }

}


