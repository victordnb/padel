import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Liga } from '../interface/liga';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css']
})
export class LigaComponent {
  mostrarFormulario = false;
  numParticipantes = 0;
  posiblesParticipantes = Array.from({length: 10}, (_, i) => i + 1); // Para seleccionar de 1 a 10 participantes
  arrayParticipantes: FormControl[] = [];
  nombresDeUsuario: string[] = [];
  filteredOptions: Observable<string[]>[] = [];
  nombreLigaControl = new FormControl('', Validators.required);
  ligas: Liga[] = [];
  displayedColumns: string[] = ['nombre', 'participantes'];

  constructor(private sharedService: SharedService, private router: Router) { }

  mostrarFormularioCrearLiga() {
    this.mostrarFormulario = true;
    this.sharedService.obtenerNombresDeUsuario().subscribe(usernames => {
      this.nombresDeUsuario = usernames;
      console.log(usernames); // Deberías ver los nombres de usuario en la consola
    }, error => {
      console.error('Error:', error);
    }); 
  }

  ngOnInit() {
    const usernameDelUsuario = localStorage.getItem('user'); 
    if (usernameDelUsuario) {
      this.sharedService.obtenerLigasPorUsername(usernameDelUsuario)
        .pipe(
          catchError(error => {
            console.error('Error al obtener las ligas por username', error);
            return of([]); // Retorna un observable vacío para que el flujo continúe
          })
        )
        .subscribe(ligas => {
          this.ligas = ligas;
        });
    } else {
      console.log('No se encontró el nombre de usuario en el localStorage');
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  // guardarLiga() {
  //   // Aquí puedes implementar la lógica para guardar la liga
  //   console.log(this.arrayParticipantes.map(participante => participante.value));
    
  // }

  guardarLiga() {
    const liga = {
      nombre: this.nombreLigaControl.value,
      participantes: this.arrayParticipantes.map(participante => ({
        username: participante.value,
        points: 0 
      }))
    };
    console.log('Liga:', liga);
  
    this.sharedService.guardarLiga(liga).subscribe(response => {
      console.log('Liga guardada:', response);
    }, error => {
      console.error('Error:', error);
    });
  }

  

  // Esta función se llama cada vez que se cambia el número de participantes
  actualizarParticipantes() {
    this.arrayParticipantes = Array.from({length: this.numParticipantes}, () => new FormControl(''));
    this.filteredOptions = this.arrayParticipantes.map(control => 
      control.valueChanges.pipe(
        startWith(''),
        filter(value => value && value.length >= 3),
        map(value => this._filter(value)),
        tap(options => {
          if (options.length === 0) {
            alert('El jugador debe estar registrado en la app, dígale que lo haga para que participe en la liga, gracias!');
            control.reset();
          }
        })
      )
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nombresDeUsuario.filter(option => option.toLowerCase().includes(filterValue));
  }

  verDetallesDeLiga(ligaId: string) {
    this.router.navigate(['/liga', ligaId]);
  }

}