import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {TokenService} from './token-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEYS = {
    USER_DATA:        'user_data',
    HAS_SEEN_WELCOME: 'has_seen_welcome',
  };

  constructor(private router: Router,private tokenService: TokenService) {}

  // --- Token ---
  setAuthToken(token:string): void {
    this.tokenService.setToken(token);
  }





  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  // --- User Data ---
  setUserData(userData: any): void {
    localStorage.setItem(this.KEYS.USER_DATA, JSON.stringify(userData));
  }


  getUserData(): any | null {
    try {
      const data = localStorage.getItem(this.KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }


  getUsername(): string | null {
    return this.getUserData()?.username ?? null;
  }

  // --- Welcome Flow ---
  isNewUser(): boolean {
    return localStorage.getItem(this.KEYS.HAS_SEEN_WELCOME) !== 'true';
  }

  markWelcomeAsSeen(): void {
    localStorage.setItem(this.KEYS.HAS_SEEN_WELCOME, 'true');
  }

  resetNewUserStatus(): void {
    localStorage.removeItem(this.KEYS.HAS_SEEN_WELCOME);
  }

  // --- Navigation ---
  handleLoginSuccess(): void {
    this.isNewUser()
      ? this.router.navigate(['/welcome'])
      : this.router.navigate(['/dashboard']);
  }

  handleRegistrationSuccess(): void {
    this.resetNewUserStatus();
    this.router.navigate(['/welcome']);
  }

  // --- Logout ---
  logout(): void {
    this.tokenService.clearAllCookies();
    localStorage.removeItem(this.KEYS.USER_DATA);
    this.router.navigate(['/auth/login']);
  }
}
