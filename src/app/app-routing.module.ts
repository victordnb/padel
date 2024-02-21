import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipistaComponent } from './multipista/multipista.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component'; 
import { PanelusuarioComponent } from './panelusuario/panelusuario.component';
import { RandomMatchComponent } from './random-match/random-match.component';
import { AuthGuard } from './auth-guard.service';
import { LigaComponent } from './liga/liga.component';

const routes: Routes = [
  { path: 'multipista', component: MultipistaComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mi-perfil', component: PanelusuarioComponent, canActivate: [AuthGuard] },
  { path: 'random-match', component: RandomMatchComponent, canActivate: [AuthGuard] },
  { path: 'liga', component: LigaComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }