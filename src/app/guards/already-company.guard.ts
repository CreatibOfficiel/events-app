import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { inject } from '@angular/core';

export const alreadyCompanyGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isCompany()) {
    return router.parseUrl('/');
  }

  return true;
};
