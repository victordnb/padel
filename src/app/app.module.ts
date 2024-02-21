import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MultipistaComponent } from './multipista/multipista.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SharedService } from './shared.service';
import { PlayersComponent } from './players/players.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Component} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { PanelusuarioComponent } from './panelusuario/panelusuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RandomMatchComponent } from './random-match/random-match.component';
import { LigaComponent } from './liga/liga.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';




const routes: Routes = [
  { path: 'multip', component: SharedService }, 
];

@NgModule({
  declarations: [
    AppComponent,
    MultipistaComponent,
    PlayersComponent,
    HeaderComponent,
    RegisterComponent,
    MainComponent,
    LoginComponent,
    PanelusuarioComponent,
    RandomMatchComponent,
    LigaComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
