import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEYS = {
    TOKEN:            'token',
    USER_DATA:        'user_data',
    HAS_SEEN_WELCOME: 'has_seen_welcome',
  };

  constructor(private router: Router) {}

  // --- Token ---
  setAuthToken(token: string): void {
    localStorage.setItem(this.KEYS.TOKEN, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.KEYS.TOKEN);
  }


  isAuthenticated(): boolean {
    return !!this.getAuthToken();
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
    Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
    this.router.navigate(['/auth/login']);
  }
}
