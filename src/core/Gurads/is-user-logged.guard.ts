import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map, catchError, of } from 'rxjs';

export const isUserLoggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((user) => {
      if (user) {
        return router.createUrlTree(['/todohome']); // Redirect to home if logged in
      } else {
        return true; // Allow access to login/signup if not logged in
      }
    }),
    catchError(() => {
      // In case of an error, we can redirect to a fallback page, like the login page
      return of(router.createUrlTree(['/signin']));
    })
  );
};
