// register.component.ts
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;

  isFormValid = false;

  constructor(public sharedService: SharedService, private router: Router) { }

  onSubmit() {
    this.isFormValid = this.registerForm.valid || false;
    if (this.isFormValid) {
      const formData = this.registerForm.value;
      console.log('formData', this.registerForm);

      this.sharedService.register(formData).subscribe((response: any) => {
        if (response) {
          alert('Registro exitoso. Haz clic en Aceptar para continuar.');
          this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
        }
        console.log('response --> ', response);
      }, error => {
        console.error('Error:', error);
      });
    }
  }
}