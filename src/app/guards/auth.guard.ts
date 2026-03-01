import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (!this.authService.isNewUser()) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // If user is new and hasn't seen welcome, redirect to welcome
    if (this.authService.isNewUser()) {
      this.router.navigate(['/welcome']);
      return false;
    }

    return true;
  }
}
