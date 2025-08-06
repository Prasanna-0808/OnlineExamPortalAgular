import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { AuthService } from '../Register/register.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(Auth)
  const router = inject(Router);
  if(authService.isLogged()){
    return true;
  }else{
    router.navigateByUrl('/login');
    return false;
  }
  
};
