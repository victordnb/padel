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
    console.log('entra en el constructor del login.component.ts');
  }
 
  onSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
  
    this.sharedService.login(user).subscribe((response: any) => {
      console.log('response:', response);
      if (response && response.token && response.user) {
        // Almacenar el token en el almacenamiento local
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        //guardar el token en el sharedService al usuario logueado:
        try{
          console.log('entra en el try del setTokenToUser');
          this.sharedService.setTokenToUser(response.token);

        } catch (error) {
          console.log('entra en el catch del setTokenToUser');
          console.log('error en el setTokenToUser, no se ha podido guardar', error);
        }
        alert('Inicio de sesión exitoso. Serás redirigido a la página de inicio.');
        this.router.navigate(['/main']);
      } else {
        alert('Inicio de sesión fallido. Por favor, intenta de nuevo.');
      }
    }, (error: HttpErrorResponse) => {
      console.error('Error:', error);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}