import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map, catchError, of } from 'rxjs';

export const isUserNotLoggedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((user) => {
      if (user) {
        return true; // Allow access to authenticated routes
      } else {
        return router.createUrlTree(['/signin']); // Redirect to sign-in if not logged in
      }
    }),
    catchError(() => {
      // In case of an error, we can redirect to a fallback page, like the sign-in page
      return of(router.createUrlTree(['/signin']));
    })
  );
};
