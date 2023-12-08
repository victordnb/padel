import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  goToRegister() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/mi-perfil']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}