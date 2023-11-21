// register.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Aquí es donde enviarías los datos a tu servicio
      console.log(form.value);
    }
  }
}