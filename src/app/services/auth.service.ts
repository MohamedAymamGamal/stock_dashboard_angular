import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly NEW_USER_KEY = 'is_new_user';
  private readonly HAS_SEEN_WELCOME_KEY = 'has_seen_welcome';

  constructor(
    private router: Router,
    private api: Api
  ) {}

  // Check if user is new (hasn't seen welcome page)
  isNewUser(): boolean {
    const hasSeenWelcome = localStorage.getItem(this.HAS_SEEN_WELCOME_KEY);
    return hasSeenWelcome !== 'true';
  }

  // Mark welcome page as seen
  markWelcomeAsSeen(): void {
    localStorage.setItem(this.HAS_SEEN_WELCOME_KEY, 'true');
  }

  // Reset new user status (for testing or logout)
  resetNewUserStatus(): void {
    localStorage.removeItem(this.HAS_SEEN_WELCOME_KEY);
  }

  // Handle user login - redirect based on new user status
  handleLoginSuccess(): void {
    if (this.isNewUser()) {
      this.router.navigate(['/welcome']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  // Handle user registration - mark as new user and redirect to welcome
  handleRegistrationSuccess(): void {
    this.resetNewUserStatus(); // Ensure they're marked as new
    this.router.navigate(['/welcome']);
  }

  // Check authentication status (you can expand this based on your auth implementation)
  isAuthenticated(): boolean {
    // This is a placeholder - implement based on your actual auth logic
    // You might check for a token, session, etc.
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  // Logout user
  logout(): void {
    // Clear auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.resetNewUserStatus();
    this.router.navigate(['/auth/login']);
  }

  // Store authentication token
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Get authentication token
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Store user data
  setUserData(userData: any): void {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  // Get user data
  getUserData(): any | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }
}
