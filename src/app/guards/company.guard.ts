import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { inject } from '@angular/core';

export const companyGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isCompany() || router.parseUrl('/');
};
