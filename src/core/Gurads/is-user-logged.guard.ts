import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs';

export const isUserLoggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((user) => {
      if (user) {
        return router.createUrlTree(['/todohome']); // Redirect to home if logged in
      } else {
        return true; // Allow access to auth pages if not logged in
      }
    })
  );
};
