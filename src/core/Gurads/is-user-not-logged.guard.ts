import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs';

export const isUserNotLoggedGuard: CanActivateFn = () => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);

  return _AuthService.$user.pipe(
    map((user) => {
      if (!user) {
        // Redirect to 'signin' if not logged in
        return _Router.createUrlTree(['/signin']);
      }
      return true; // Allow access to Todo routes if logged in
    })
  );
};
