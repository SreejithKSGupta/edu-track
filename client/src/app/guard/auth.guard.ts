import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  constructor(private router: Router, private cookie: CookieService) {}

  canActivate(p0: ActivatedRouteSnapshot): boolean {
    if (this.cookie.get('user_id')) {
      console.log('User is authenticated',p0);
      return true;
    }else{
      this.router.navigate(['signin'])
      return false;
    }
  }

  canActivateChild(p0: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    return this.canActivate(p0);
  }

}