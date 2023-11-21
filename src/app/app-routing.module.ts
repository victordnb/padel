import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipistaComponent } from './multipista/multipista.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: 'multipista', component: MultipistaComponent },
   { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
