import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    // Implementa la lógica para verificar si el usuario está logueado
    // Por ahora, solo devolveremos false
    return false;
  }
}