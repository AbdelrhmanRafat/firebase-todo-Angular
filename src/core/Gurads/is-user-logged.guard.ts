import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs';

export const isUserLoggedGuard: CanActivateFn = () => {
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);

  return _AuthService.$user.pipe(
    map((user) => {
      if (user) {
        // Redirect to 'todohome' if logged in
        return _Router.createUrlTree(['/todohome']);
      }
      return true; // Allow access to Auth routes if not logged in
    })
  );
};
