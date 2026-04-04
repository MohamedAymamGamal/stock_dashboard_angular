import {inject, Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private cookieService = inject(CookieService);
  private readonly TOKEN_KEY = 'token';

  setToken(token: string):void {
    this.cookieService.set(this.TOKEN_KEY, token,{
      path: '/', //for all routes
      // secure: true, for https
      sameSite: 'Strict', // secure cookie level
      expires:7, //time in days

    });

  }
  getToken(): string | null  {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
  //or
  //hasToken(): boolean {
  //  return this.cookieService.check(this.TOKEN_KEY);
  //}

  clearToken():void {
    this.cookieService.delete(this.TOKEN_KEY);
  }

  clearAllCookies():void{
      this.cookieService.deleteAll('/');
  }

}
