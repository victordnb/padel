import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Si existe un token, permitir la navegación
      return true;
    } else {
      // Si no existe un token, redirigir a /login
      this.router.navigate(['/login']);
      return false;
    }
  }
}