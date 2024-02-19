import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private sharedService: SharedService, private router: Router) { 
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
  
    this.sharedService.login(user).subscribe((response: string) => {
      if (response) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', response);
  
        alert('Inicio de sesión exitoso. Serás redirigido a la página de inicio.');
        this.router.navigate(['/main']);
      } else {
        alert('Inicio de sesión fallido. Por favor, intenta de nuevo.');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
    });
  }
}