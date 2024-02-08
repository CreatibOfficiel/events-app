import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let isAdmin = false;

  userService.getCurrentUserRoles().subscribe((res: any) => {
    let userRoles = res;
    isAdmin = userRoles.includes("ROLE_ADMIN");
  });

  return isAdmin || router.parseUrl('/');
};
