import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { inject } from '@angular/core';

export const alreadyCompanyGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (await userService.isCurrentUserCompany()) {
    return router.parseUrl('/');
  }

  return true;
};
