// register.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public sharedService: SharedService, private router: Router) { }

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      const formData = registerForm.value;
      console.log('formData', registerForm);

      this.sharedService.register(formData).subscribe((response: any) => {
        if (response) {
          alert('Registro exitoso. Haz clic en Aceptar para continuar.');
          this.router.navigate(['/']);
        }
        console.log('response --> ', response);
      }, error => {
        console.error('Error:', error);
      });
    }
  }
}