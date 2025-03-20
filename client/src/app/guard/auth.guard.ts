import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  // Track loading state
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthserviceService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // Return a Promise to handle the authentication check asynchronously
    console.log(route)
    return new Promise((resolve) => {
      // Start loading
      this.isLoading$.next(true);

      // Add a small delay to simulate network request time
      setTimeout(() => {
        // Check authentication
        const isAuthenticated = this.authService.isAuthenticated();

        if (!isAuthenticated) {
          // Navigate to signin page if not authenticated
          this.router.navigate(['/signin'], { replaceUrl: true });
        }

        // Stop loading
        this.isLoading$.next(false);

        // Resolve with authentication result
        resolve(isAuthenticated);
      }, 500); // Adjust timing as needed
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.canActivate(route);
  }
}
