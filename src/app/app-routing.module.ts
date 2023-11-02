import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipistaComponent } from './multipista/multipista.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'multipista', component: MultipistaComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule { }
