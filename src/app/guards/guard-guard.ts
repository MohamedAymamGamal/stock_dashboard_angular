import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  if(authService.isAuthenticated() ) {
    return true;
  }else {
   return  router.createUrlTree(['auth/login'])

  }


};
