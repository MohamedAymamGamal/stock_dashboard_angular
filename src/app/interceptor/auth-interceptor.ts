import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn =
  (req:HttpRequest<any>,
   next:HttpHandlerFn): Observable<HttpEvent<any>> => {

  const token = localStorage.getItem('auth_token');
  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloned);
};
