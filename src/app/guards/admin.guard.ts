import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../core/user.service';
import {inject} from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.IsRoleAdmin() || router.parseUrl('/');
};
