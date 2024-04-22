import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CiudadanoService } from '../ciudadano-table/ciudadano.service';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(CiudadanoService)
  const router = inject(Router)
  const requiredPermissions = route.data['expectedRole'] as string[];

  if (!authService.isAuthenticated()) {
    console.log("Usuario no autenticado")
    router.navigate(['']);
    return false;
  }
  if(!authService.hasAllPermissions(requiredPermissions)){
    console.log("Usuario no autorizado")
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
