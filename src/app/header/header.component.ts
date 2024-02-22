import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
  }
  verDetallesDeLiga(ligaId: string) {
    this.router.navigate(['/liga', ligaId]);
  }

  logout() {
    localStorage.clear(); // Borra todo el almacenamiento local
    location.reload(); // Recarga la página
  }


  goToRegister() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/mi-perfil']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  login() {
    // Aquí puedes agregar la lógica que necesites antes de redirigir al usuario
    // Por ejemplo, podrías abrir un modal de inicio de sesión

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  goToRandomMatch() {
    // Redirige al usuario a la página de Partido Aleatorio
    this.router.navigate(['/random-match']);
  }
}